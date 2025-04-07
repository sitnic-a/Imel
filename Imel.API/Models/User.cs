#pragma warning disable CS8618

namespace Imel.API.Models
{
    public class User : BaseClassEntity
    {
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordSalt { get; set; }
        public string PasswordHash { get; set; } = string.Empty;

        public User(){}
        public User(string email, byte[] passwordSalt, string passwordHash)
        {
            Email = email;
            PasswordSalt = passwordSalt;
            PasswordHash = passwordHash;
            Created = DateTime.Now;
        }
    }
}
