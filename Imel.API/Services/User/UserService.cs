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

        public async Task<ResponseObject> Get(QueryUsers searchQuery, PaginationParams? paginationParams = null)
        {
            try
            {
                var dbUsers = _context.Users.AsQueryable();
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
                        //dbUsers = dbUsers.Where(u => u)
                    }
                }

                await dbUsers.ToListAsync();

                return new ResponseObject(dbUsers, StatusCodes.Status200OK, "");
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
