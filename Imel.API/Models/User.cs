#pragma warning disable CS8618

namespace Imel.API.Models
{
    public class User : BaseClassEntity
    {
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordSalt { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public bool Status { get; set; }

        public User() { }

        public User(string email, bool? status = null)
        {
            Email = email;
            if (status != null)
                Status = status.Value;
        }

        public User(int id, string email, byte[] passwordSalt, string passwordHash)
        {
            Id = id;
            Email = email;
            PasswordSalt = passwordSalt;
            PasswordHash = passwordHash;
            Status = true;
        }
        public User(string email, byte[] passwordSalt, string passwordHash)
        {
            Email = email;
            PasswordSalt = passwordSalt;
            PasswordHash = passwordHash;
            Created = DateTime.Now;
        }

    }
}
