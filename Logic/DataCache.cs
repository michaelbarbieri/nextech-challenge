using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace NewsApi.Logic
{
    // Simple dictionary-based in-memory cache with expirations.  Receives a fetch function in the constructor and
    // from that point on is "read-only".  Will automatically fetch on cache miss.
    public class DataCache<TKey, TValue>
    {
        // Bundle the value with a timestamp to handle expirations.
        private class CacheEntry
        {
            public CacheEntry(TValue value)
            {
                this.value = value;
                this.timestamp = CreateTimestamp();
            }
            public readonly TValue value;
            public readonly long timestamp;
        }

        // Lifetime in milliseconds of cache entries.  Zero means no expiration.
        private readonly int _lifetime;

        // This delegate will be called on a cache miss.
        private readonly Func<TKey, Task<TValue>> _fetch;

        // Thread-safe Dictionary object.
        private readonly ConcurrentDictionary<TKey, CacheEntry> _cache = new ConcurrentDictionary<TKey, CacheEntry>();


        public DataCache(Func<TKey, Task<TValue>> fetch, int lifetimeMilliseconds = 0)
        {
            this._fetch = fetch;
            this._lifetime = lifetimeMilliseconds;
        }

        public Task<TValue> this[TKey key]
        {
             get { return Get(key); }
        }

        // Return what's in the cache if it's fresh, or else fetch something, cache it, and return it.
        public async Task<TValue> Get(TKey key)
        {
            TValue result;
            if(IsCacheHit(key))
            {
                result = this._cache[key].value;
            }
            else
            {
                result = await this._fetch(key);
                Put(key, result);
            }
            return result;
        }




        private void Put(TKey key, TValue value)
        {
            CacheEntry entry = new CacheEntry(value);
            this._cache[key] = entry;
        }
        private static long CreateTimestamp()
        {
            return DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }
        private bool IsCacheHit(TKey key)
        {
            return this._cache.ContainsKey(key) && !IsEntryExpired(this._cache[key]);
        }
        private bool IsEntryExpired(CacheEntry entry)
        {
            if(this._lifetime != 0)
            {
                long millis = CreateTimestamp() - entry.timestamp;
                return (millis > this._lifetime);
            }
            return false;
        }


    }
}


