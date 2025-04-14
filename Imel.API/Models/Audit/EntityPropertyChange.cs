namespace Imel.API.Models.Audit
{
    public class EntityPropertyChange
    {
        public Guid Id { get; set; }
        public string? NewValue { get; set; }
        public string? OriginalValue { get; set; }
        public string? PropertyName { get; set; }
        public string? PropertyTypeFullName { get; set; }
        public Guid AuditLogId { get; set; }
    }
}
