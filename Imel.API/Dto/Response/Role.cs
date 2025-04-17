namespace Imel.API.Dto.Response
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }= string.Empty;

        public Role(int id, string name)
        {
            Id = id;
            Name = name;
        }

    }
}
