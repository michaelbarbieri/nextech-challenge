using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using NewsApi.Models;
using NewsApi.Services;

namespace NewsApi.Controllers
{
    [Route("api/[controller]")]
    public class NewsController : Controller
    {
        public NewsController(INewsService newsItems)
        {
            NewsItems = newsItems;
        }
        public INewsService NewsItems { get; set; }

        [HttpGet]
        public async Task<IActionResult> Get(int page, int numPerPage, string filter)
        {
            if(filter == null)
                filter = "";
            if(numPerPage == 0)
                numPerPage = 10;

            NewsResult result = await NewsItems.Get(page, numPerPage, filter);
            return new ObjectResult(result);
        }
    }
}
