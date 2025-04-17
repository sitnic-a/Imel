using Imel.API.Dto.Request;

namespace Imel.API.Extensions
{
    public static class RequestExtensionMethods
    {
        public static bool IsValid(this RegisterDto request)
        {
            if (String.IsNullOrEmpty(request.Email) || 
                String.IsNullOrWhiteSpace(request.Email) || 
                String.IsNullOrEmpty(request.Password) || 
                String.IsNullOrWhiteSpace(request.Password)) return false;

            if (request.Password.Length < 8) return false;

            return true;
        }
    }
}
