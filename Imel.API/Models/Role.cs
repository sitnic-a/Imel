namespace Imel.API.Models
{
    public class Role : BaseClassEntity
    {
        public string Name { get; set; } = string.Empty;

        public Role(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
