using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using NewsApi.Logic;

namespace Tests
{
    public class DataCacheTest
    {
        private volatile int _fetchCounter = 0;

        [Fact]
        public async void CacheWillCallFetchMethod()
        {
            DataCache<int, string> cache = new DataCache<int, string>(IncrementFetchCounter, 500);

            string cached = await cache[0];
            string val = await IncrementFetchCounter(0);

            Assert.Equal(cached, val);
        }

        [Fact]
        public async void CacheWillMissIfRecordStale()
        {
            this._fetchCounter = 0;
            DataCache<int, string> cache = new DataCache<int, string>(IncrementFetchCounter, 500);

            // _fetchCounter should increment
            string val = await cache[0];

            // _fetchCounter should NOT increment
            for(int i = 0; i < 5; i++) {
                Thread.Sleep(50);
                val = await cache[0];
            }

            // _fetchCounter should increment
            Thread.Sleep(500);
            val = await cache[0];

            Assert.Equal(2, this._fetchCounter);
        }

        private Task<string> IncrementFetchCounter(int dummy)
        {
            this._fetchCounter++;
            return Task.FromResult("dummy");
        }
    }
}
