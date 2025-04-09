using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Imel.API.Services.User
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly ILogger<IUserService> _userLogger;

        public UserService(DataContext context, ILogger<IUserService> userLogger)
        {
            _context = context;
            _userLogger = userLogger;
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
                    .Select(u => new UserDto(u.Id,u.Email, u.Status))
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
