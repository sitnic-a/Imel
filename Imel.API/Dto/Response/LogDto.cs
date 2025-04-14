namespace Imel.API.Dto.Response
{
    public class LogDto
    {
        public Guid Id { get; set; }
        public string ChangedBy { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Method { get; set; } = string.Empty;
        public string OriginalValue { get; set; } = string.Empty;
        public string CurrentValue { get; set; } = string.Empty;
        public DateTime LoggedAt { get; set; }
        public string LoggedAtAsString { get; set; } = string.Empty;

        public LogDto(Guid id, string changedBy, string role, string method, string originalValue, string currentValue, DateTime loggedAt)
        {
            Id = id;
            ChangedBy = changedBy;
            Role = role;
            Method = method;
            OriginalValue = originalValue;
            CurrentValue = currentValue;
            LoggedAt = loggedAt;
            LoggedAtAsString = LoggedAt.ToString("dd/mm/yyyy hh:mm:ss");
        }
    }
}
