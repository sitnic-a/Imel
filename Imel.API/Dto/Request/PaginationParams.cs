namespace Imel.API.Dto.Request
{
    public class PaginationParams
    {
        public int ElementsPerPage { get; set; } = 5;
        public int CurrentPage { get; set; } = 1;
        public int PreviousPage => CurrentPage - 1;
        public int LastPage { get; set; }

    }
}
