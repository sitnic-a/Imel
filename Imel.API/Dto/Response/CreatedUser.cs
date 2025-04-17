namespace Imel.API.Dto.Response
{
    public class CreatedUser
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public List<Role> Roles { get; set; }

        public CreatedUser(int id, string email, List<Role> roles)
        {
            Id = id;
            Email = email;
            Roles = roles;
        }
    }
}
