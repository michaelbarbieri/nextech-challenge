using System.Collections.Generic;
using System.Linq;

using NewsApi.Models;

namespace NewsApi.Logic
{
    // In-place list filters
    public static class Filters
    {
        // Slice off the front and back of the list according to paging parameters.  Page is zero-based.
        public static void ApplyPageFilter<T>(List<T> items, int page, int numPerPage)
        {
            if(items.Count > numPerPage) {
                items.RemoveRange(0, page * numPerPage);
                if(items.Count > numPerPage)
                    items.RemoveRange(numPerPage, items.Count - numPerPage);
            }
        }

        // Basic case-insensitive text search
        public static void ApplyTextFilter(List<NewsItem> items, string filter)
        {
            string loweredFilter = filter.ToLower();
            List<NewsItem> filteredOut = (from item in items
                                          where !item.Title.ToLower().Contains(loweredFilter)
                                          select item).ToList();
            items.RemoveAll((NewsItem item) => filteredOut.Contains(item));
        }
    }
}