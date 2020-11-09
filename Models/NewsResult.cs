namespace NewsApi.Models
{
    public class NewsResult
    {
        public NewsItem[] Results { get; set; }
        public int TotalPages { get; set; }
    }
}
