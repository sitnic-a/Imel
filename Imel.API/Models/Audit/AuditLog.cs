namespace Imel.API.Models.Audit
{
    public class AuditLog
    {
        public Guid Id { get; set; }

        public string? ChangedByUserId { get; set; } = string.Empty;
        public string? ChangedBy { get; set; } = string.Empty;
        public string? ChangedByRole { get; set; } = string.Empty;


        public string? ServiceName { get; set; } = string.Empty;
        public string? MethodName { get; set; } = string.Empty;
        public string? Url { get; set; } = string.Empty;

        public string? Entity { get; set; } = string.Empty;
        public string? OriginalValue { get; set; } = string.Empty;
        public string? NewValue { get; set; } = string.Empty;

        public DateTime? LoggedAt { get; set; }
    }
}
