using AutoMapper;
using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Extensions;
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

        public async Task<ResponseObject> AddNewUser(NewUser request)
        {
            try
            {
                const int __USER_ROLE_ = 2;
                if (request != null)
                {
                    if (request.Roles.Any(r => r == __USER_ROLE_))
                    {
                        RegisterDto newUser = new RegisterDto(request.Email, request?.Password, request?.Roles);
                        var createdUser = await _authService.Register(newUser);
                        if (createdUser == null)
                        {
                            _userLogger.LogWarning("ADD-NEW-USER: New user is not created!", [createdUser]);
                            return new ResponseObject(createdUser, StatusCodes.Status204NoContent, "ADD-NEW-USER: New user is not created!");
                        }
                        var query = new QueryUsers();
                        var paginationParams = new PaginationParams();
                        var users = await Get(query, paginationParams);
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
                    dbUser = _mapper.Map<Models.User>(request);
                    _context.Update(dbUser) ;
                    await _context.SaveChangesAsync();
                    _userLogger.LogInformation("UPDATE: Succesfully updated user", [dbUser]);
                    var query = new QueryUsers();
                    var paginationParams = new PaginationParams();
                    var users = Get(query, paginationParams);
                    return new ResponseObject(users, StatusCodes.Status200OK, "UPDATE: Succesfully updated user");
                }
                _userLogger.LogWarning("UPDATE: User not available", [dbUser]);
                return new ResponseObject(dbUser, StatusCodes.Status404NotFound, "UPDATE: User not available");

            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
