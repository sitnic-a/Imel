namespace Imel.API.Exceptions
{
    public class RecordAlreadyExistException : Exception
    {
        public RecordAlreadyExistException() { }

        public RecordAlreadyExistException(string message)
            : base(message) { }

        public RecordAlreadyExistException(string message, Exception inner)
            : base(message, inner) { }
    }
}
