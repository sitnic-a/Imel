namespace Imel.API.Dto.Response
{
    public class ResponseObject
    {
        public object Response {get;set;}
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;

        public ResponseObject(object response, int statusCode, string message)
        {
            Response = response;
            StatusCode = statusCode;
            Message = message;
        }
    }
}
