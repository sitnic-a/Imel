using Imel.API.Dto.Request;
using Imel.API.Dto.Response;
using Imel.API.Extensions;

namespace Imel.API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        public AuthService(DataContext context)
        {
            _context = context;
        }
        //public async Task<ResponseObject> Register(RegisterDto request)
        //{
        //    if (!request.IsValid())
        //    {
        //        throw new ArgumentNullException(request.ToString());  
        //    }
        //    var newUser = 
        //}
    }
}
