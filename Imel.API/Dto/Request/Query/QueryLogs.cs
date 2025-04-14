namespace Imel.API.Dto.Request.Query
{
    public class QueryLogs
    {
        public DateTime? CreatedAt { get; set; } = null;

        public QueryLogs()
        {
            CreatedAt = null;
        }
    }
}
