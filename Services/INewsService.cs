using System.Collections.Generic;
using System.Threading.Tasks;

using NewsApi.Models;

namespace NewsApi.Services
{
    public interface INewsService
    {
        Task<NewsResult> Get(int page, int numPerPage, string filter);
    }
}
