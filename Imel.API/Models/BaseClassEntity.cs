namespace Imel.API.Models
{
    public abstract class BaseClassEntity
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
