namespace Imel.API.Dto.Response
{
    public class ResponseObject
    {
        public object Response {get;set;}
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;

        public int? DataCount { get; set; }

        public ResponseObject(){}

        public ResponseObject(object response, int statusCode, string message, int?dataCount = null)
        {
            Response = response;
            StatusCode = statusCode;
            Message = message;
            DataCount = dataCount;
        }
    }
}
