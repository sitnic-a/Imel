using Imel.API.Dto.Request;
using Imel.API.Dto.Response;

namespace Imel.API.Services.Auth
{
    public interface IAuthService
    {
        public Task<ResponseObject> Register(RegisterDto request);
        public Task<ResponseObject> Login(LoginDto request);
    }
}
