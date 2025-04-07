using Imel.API.Dto.Response;

namespace Imel.API.Dto.Response
{
    public class SignedUser
    {
        public string JWToken { get; set; } = string.Empty;
        public List<Role> Roles { get;set; }= new List<Role>();
    }
}
