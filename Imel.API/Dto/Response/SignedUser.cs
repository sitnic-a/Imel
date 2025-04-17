using Imel.API.Dto.Response;

namespace Imel.API.Dto.Response
{
    public class SignedUser
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string JWToken { get; set; } = string.Empty;
        public List<Role> Roles { get;set; }= new List<Role>();

        public SignedUser(int id, string email, string jwToken, List<Role> roles)
        {
            Id = id;
            Email = email;
            JWToken = jwToken;
            Roles = roles;
        }
    }
}
