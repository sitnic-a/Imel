using System.ComponentModel.DataAnnotations;

namespace Imel.API.Dto.Request
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;

        public RegisterDto(){}
    }
}
