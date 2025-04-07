using ResponseDto = Imel.API.Dto.Response;
using Imel.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Imel.API.Helper
{
    public class RoleHelper
    {
        private readonly DataContext _context;
        public RoleHelper(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ResponseDto.Role>> GetUserRoles(User user)
        {
            var dbRoles = await _context.UserRoles
                .Include(r => r.Role)
                .Where(u => u.UserId == user.Id)
                .Select(ur => new ResponseDto.Role(ur.Role.Id, ur.Role.Name))
                .ToListAsync();

            return dbRoles;
        }
    }
}
