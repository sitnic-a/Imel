namespace Imel.API.Dto.Request
{
    public class NewUser
    {
        public string Email { get; set; } = string.Empty;
        public string? Password { get; set; }=string.Empty;
        public List<int>? Roles { get; set; }
    }
}
