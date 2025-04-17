namespace Imel.API.Dto.Response
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public bool Status { get; set; }
        public string StatusAsString { get; set; } = string.Empty;

        public UserDto(int id, string email, bool status)
        {
            Id = id;
            Email = email;
            Status = status;
            if (Status == true)
                StatusAsString = "Aktivan";
            else
                StatusAsString = "Neaktivan";
        }
    }
}
