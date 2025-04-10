using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Extensions;
using Imel.API.Services.Auth;
using Microsoft.EntityFrameworkCore;

namespace Imel.API.Services.User
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IAuthService _authService;
        private readonly ILogger<IUserService> _userLogger;

        public UserService(DataContext context, IAuthService authService, ILogger<IUserService> userLogger)
        {
            _context = context;
            _authService = authService;
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

                if (paginationParams.CurrentPage > 1)
                {
                    await dbUsers
                            .Skip(paginationParams.CurrentPage - 1 * paginationParams.ElementsPerPage)
                            .Take(paginationParams.ElementsPerPage)
                            .ToListAsync();
                }

                var responseUsers = await dbUsers
                    .Take(paginationParams.ElementsPerPage)
                    .Select(u => new UserDto(u.Id, u.Email, u.Status))
                    .ToListAsync();

                _userLogger.LogInformation("GET: Succesfully retrieved users", [dbUsers]);
                return new ResponseObject(responseUsers, StatusCodes.Status200OK, "GET: Succesfully retrieved users");
            }
            catch (Exception e)
            {
                _userLogger.LogError($"GET: {e.Message}", [e]);
                return new ResponseObject(e, StatusCodes.Status500InternalServerError, $"GET: {e.Message}");
            }
        }
    }
}
