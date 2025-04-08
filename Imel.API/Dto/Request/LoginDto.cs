using System.ComponentModel.DataAnnotations;

namespace Imel.API.Dto.Request
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;

        public LoginDto(){}

    }
}
