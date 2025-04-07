using Imel.API.Dto.Response;
using System.ComponentModel.DataAnnotations;

#pragma warning disable CS8618

namespace Imel.API.Dto.Request
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;
        public List<int>? Roles { get; set; }

        public RegisterDto(){}
    }
}
