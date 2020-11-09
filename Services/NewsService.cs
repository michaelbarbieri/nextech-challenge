using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Text.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Linq;

using NewsApi.Models;
using NewsApi.Logic;

namespace NewsApi.Services
{
    public class NewsService : INewsService
    {
        private static readonly string BASE_URL = "https://hacker-news.firebaseio.com/v0/";

        private static readonly HttpClient _client = new HttpClient();

        // Create cache for individual story info.
        private readonly DataCache<int, NewsItem> _itemCache = new DataCache<int, NewsItem>(FetchNewsItem);

        // Create cache for top 500 stories.  This will prevent the search feature from making a ton of calls
        // to the topstories API.
        private readonly DataCache<int, int[]> _topCache = new DataCache<int, int[]>(FetchTop, 30000);

        // This fetch method and the one below are sent to the caches for fetching on cache misses.
        private static async Task<NewsItem> FetchNewsItem(int id)
        {
            string rawItem = await _client.GetStringAsync($"{BASE_URL}item/{id}.json");
            NewsItem item = JsonSerializer.Deserialize<NewsItem>(rawItem, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            return item;
        }

        // This can probably be done better, without "dummies".  I originally thought I'd just cache the array manually
        // in NewsService, but then I decided this cache should have a lifetime (unlike the story cache which doesn't
        // really need one or maybe can have a really long one), so I added the lifetime functionality to the cache for
        // the topstories fetch.  Maybe a SimpleCache class or a more flexible cache class that can handle keyless cases
        // would be better.
        private static async Task<int[]> FetchTop(int dummy)
        {
            string rawItems = await _client.GetStringAsync($"{BASE_URL}topstories.json");
            int[] items = JsonSerializer.Deserialize<int[]>(rawItems);
            return items;
        }

        // Perform all the API calls simultaneously
        private async Task<List<NewsItem>> GetNewsItems(List<int> ids)
        {
            List<NewsItem> items = new List<NewsItem>();
            List<Task<NewsItem>> itemTasks = (from id in ids
                                              select _itemCache[id]).ToList();
            return (await Task.WhenAll(itemTasks)).ToList();
        }

        // Transforming to List will make LINQ easier and also make it safe to mutate
        private async Task<List<int>> GetTopStories()
        {
            // 0 is a dummy value, see comment on FetchTop
            List<int> top = (await _topCache[0]).ToList();
            return top;
        }


        public async Task<NewsResult> Get(int page, int numPerPage, string filter)
        {
            List<int> top = await GetTopStories();
            NewsResult result = await PageAndFilterStories(top, filter, page, numPerPage);
            return result;
        }


        
        private async Task<NewsResult> PageAndFilterStories(List<int> ids, string filter, int page, int numPerPage)
        {
            int totalFilteredItems = ids.Count;

            // If the filter is empty, do the paging now.  This will save a ton of unnecessary API calls, at
            // least before caching kicks in.
            if(filter.Trim() == "")
                ApplyPageFilter(ids, page, numPerPage);

            // Get the items from the cache or the API.
            List<NewsItem> items = await GetNewsItems(ids);

            // Apply a simple text filter to the items.
            List<NewsItem> filtered = ApplyTextFilter(items, filter);

            // Apply paging to the filtered results.
            if(filter.Trim() != "")
            {
                totalFilteredItems = filtered.Count;
                ApplyPageFilter(filtered, page, numPerPage);
            }

            // Package results.
            // This had more than one member when I was considering doing traditional paging (vs. Reddit style paging)
            return new NewsResult()
            {
                Results = filtered.ToArray(),
                TotalPages = (totalFilteredItems % numPerPage == 0) ? (totalFilteredItems / numPerPage) : (totalFilteredItems / numPerPage + 1)
            };
        }

        // Slice off the front and back of the list according to paging parameters.
        private void ApplyPageFilter<T>(List<T> items, int page, int numPerPage)
        {
            if(items.Count > numPerPage) {
                items.RemoveRange(0, page * numPerPage);
                if(items.Count > numPerPage)
                    items.RemoveRange(numPerPage, items.Count - numPerPage);
            }
        }


        // Basic case-insensitive text search
        private List<NewsItem> ApplyTextFilter(List<NewsItem> items, string filter)
        {
            string loweredFilter = filter.ToLower();
            List<NewsItem> filtered = (from item in items
                                       where item.Title.ToLower().Contains(loweredFilter)
                                       select item).ToList();
            return filtered;
        }




    }
}