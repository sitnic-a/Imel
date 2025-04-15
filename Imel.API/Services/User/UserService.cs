using AutoMapper;
using Imel.API.Dto.Request;
using Imel.API.Dto.Request.Query;
using Imel.API.Dto.Response;
using Imel.API.Extensions;
using Imel.API.Models;
using Imel.API.Services.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Imel.API.Services.User
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly ILogger<IUserService> _userLogger;

        public UserService(DataContext context, IAuthService authService, IMapper mapper, ILogger<IUserService> userLogger)
        {
            _context = context;
            _authService = authService;
            _mapper = mapper;
            _userLogger = userLogger;
        }

        public async Task<ResponseObject> GetById(int id)
        {
            try
            {
                if (id <= 0)
                {
                    _userLogger.LogWarning("GET/{id}: Bad request, params", [id]);
                    return new ResponseObject(id, StatusCodes.Status400BadRequest, "GET/{id}: Bad request, params");
                }

                var dbUser = await _context.Users.FindAsync(id);

                if (dbUser == null)
                {
                    _userLogger.LogInformation("GET/{id}: User couldn't be retrieved", [dbUser]);
                    return new ResponseObject(dbUser, StatusCodes.Status404NotFound, "GET/{id}: User couldn't be retrieved");
                }

                var user = new UserDto(dbUser.Id, dbUser.Email, dbUser.Status);
                _userLogger.LogInformation("GET/{id}: Successfully retrieved user", [user]);
                return new ResponseObject(user, StatusCodes.Status200OK, "GET/{id}: Successfully retrieved user");
            }
            catch (Exception e)
            {
                _userLogger.LogInformation($"GET/{id}: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"GET/{id}: {e.Message}");
            }
        }

        public async Task<ResponseObject> Get(QueryUsers searchQuery, PaginationParams paginationParams)
        {
            try
            {
                var dbUsers = _context.Users.AsQueryable();

                if (!await dbUsers.AnyAsync())
                {
                    _userLogger.LogWarning("GET: No records found", [dbUsers]);
                    return new ResponseObject(dbUsers, StatusCodes.Status204NoContent, "GET: No records found");
                }

                if (searchQuery != null)
                {
                    if (searchQuery.IsFiltering())
                    {
                        if (!String.IsNullOrEmpty(searchQuery.Email) || !String.IsNullOrWhiteSpace(searchQuery.Email))
                        {
                            dbUsers = dbUsers.Where(u => u.Email == searchQuery.Email ||
                                               u.Email.Contains(searchQuery.Email))
                                             .AsQueryable();
                        }
                        if (searchQuery.Status != null)
                        {
                            dbUsers = dbUsers.Where(u => u.Status == searchQuery.Status);
                        }
                    }
                }

                int usersCount = dbUsers.Count();

                if (paginationParams.CurrentPage > 1)
                {
                    dbUsers = dbUsers
                            .OrderByDescending(u => u.Created)
                            .Skip(paginationParams.PreviousPage * paginationParams.ElementsPerPage)
                            .Take(paginationParams.ElementsPerPage);
                }

                var responseUsers = await dbUsers
                    .OrderByDescending(u => u.Created)
                    .Take(paginationParams.ElementsPerPage)
                    .Select(u => new UserDto(u.Id, u.Email, u.Status))
                    .ToListAsync();

                _userLogger.LogInformation("GET: Succesfully retrieved users", [dbUsers]);
                return new ResponseObject(responseUsers, StatusCodes.Status200OK, "GET: Succesfully retrieved users", usersCount);
            }
            catch (Exception e)
            {
                _userLogger.LogError($"GET: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"GET: {e.Message}");
            }
        }

        public async Task<ResponseObject> AddNewUser(NewUser request)
        {
            try
            {
                const int __USER_ROLE_ = 2;
                var query = new QueryUsers();
                var paginationParams = new PaginationParams();
                var users = new ResponseObject();
                if (request != null)
                {
                    if (request.Roles.Any(r => r == __USER_ROLE_))
                    {
                        RegisterDto newUser = new RegisterDto(request.Email, request?.Password, request?.Roles);
                        var createdUser = await _authService.Register(newUser);

                        if (createdUser.StatusCode == 400)
                        {
                            users = await Get(query, paginationParams);
                            _userLogger.LogWarning("ADD-NEW-USER: User is in database", [createdUser]);
                            return new ResponseObject(users, StatusCodes.Status400BadRequest, "ADD-NEW-USER: User is in database");
                        }

                        if (createdUser == null)
                        {
                            _userLogger.LogWarning("ADD-NEW-USER: New user is not created!", [createdUser]);
                            return new ResponseObject(createdUser, StatusCodes.Status204NoContent, "ADD-NEW-USER: New user is not created!");
                        }
                        users = await Get(query, paginationParams);
                        _userLogger.LogInformation("ADD-NEW-USER: Succesfully created user", [users]);
                        return new ResponseObject(users, StatusCodes.Status201Created, "ADD-NEW-USER: Succesfully created user");
                    }
                }
                _userLogger.LogWarning("ADD-NEW-USER: Bad request, params null", [request]);
                return new ResponseObject(request, StatusCodes.Status400BadRequest, "ADD-NEW-USER: Bad request, params null");
            }
            catch (Exception e)
            {
                _userLogger.LogError($"ADD-NEW-USER: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"ADD-NEW-USER: {e.Message}");
            }
        }
        public async Task<ResponseObject> UpdateUser(int id, UpdateUser request)
        {
            try
            {
                if (id <= 0 || request.Email.IsNullOrEmpty())
                {
                    _userLogger.LogWarning("UPDATE: Bad request sent, params", [id, request]);
                    return new ResponseObject(new { id, request }, StatusCodes.Status400BadRequest, "UPDATE: Bad request sent, params");
                }
                var dbUser = await _context.Users.FindAsync(id);
                if (dbUser != null)
                {
                    dbUser.Email = request.Email;
                    if (request.Status.HasValue)
                        dbUser.Status = request.Status.Value;
                    _context.Update(dbUser);
                    await _context.SaveChangesAsync();
                    _userLogger.LogInformation("UPDATE: Succesfully updated user", [dbUser]);
                    var query = new QueryUsers();
                    var paginationParams = new PaginationParams();
                    var users = await Get(query, paginationParams);
                    return new ResponseObject(users, StatusCodes.Status200OK, "UPDATE: Succesfully updated user", users.DataCount);
                }
                _userLogger.LogWarning("UPDATE: User not available", [dbUser]);
                return new ResponseObject(dbUser, StatusCodes.Status404NotFound, "UPDATE: User not available");

            }
            catch (Exception e)
            {
                _userLogger.LogWarning($"UPDATE: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"UPDATE: {e.Message}");
            }
        }

        public async Task<ResponseObject> DeleteById(int id)
        {
            try
            {
                if (id <= 0)
                {
                    _userLogger.LogWarning("DELETE/{id}: Bad request, params", [id]);
                    return new ResponseObject(id, StatusCodes.Status400BadRequest, "DELETE/{id}: Bad request, params");
                }
                var dbUser = await _context.Users.FindAsync(id);
                if (dbUser == null)
                {
                    _userLogger.LogWarning("DELETE/{id}: User not available", [dbUser]);
                    return new ResponseObject(dbUser, StatusCodes.Status404NotFound, "DELETE/{id}: User not available");
                }

                _context.Users.Remove(dbUser);
                await _context.SaveChangesAsync();
                var query = new QueryUsers();
                var paginationParams = new PaginationParams();
                var users = await Get(query, paginationParams);
                _userLogger.LogInformation("DELETE/{id}: Successfully deleted", [dbUser]);
                return new ResponseObject(users, StatusCodes.Status200OK, "DELETE/{id}: Successfully deleted", users.DataCount);
            }
            catch (Exception e)
            {
                _userLogger.LogError($"DELETE/{id}: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"DELETE/{id}: {e.Message}");
            }
        }
    }
}
