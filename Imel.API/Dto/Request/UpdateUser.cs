using System.ComponentModel.DataAnnotations;

namespace Imel.API.Dto.Request
{
    public class UpdateUser
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        public bool? Status { get; set; }

    }
}
