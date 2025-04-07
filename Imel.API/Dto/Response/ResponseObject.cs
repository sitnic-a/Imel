namespace Imel.API.Dto.Response
{
    public class ResponseObject
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;

        public ResponseObject(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}
