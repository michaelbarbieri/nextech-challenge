using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Xunit;

using NewsApi.Logic;
using NewsApi.Models;

namespace Tests
{
    public class FiltersTest
    {
        [Fact]
        public void PageFilterWillReturnCorrectPage()
        {
            int[] items = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 };
            List<int> list = new List<int>(items);

            Filters.ApplyPageFilter(list, 2, 5);

            int[] expectedResult = { 11, 12, 13, 14, 15 };
            Assert.True(CompareEnumerables(list, expectedResult));
        }

        [Fact]
        public void TextFilterWillReturnCorrectItems()
        {
            string[] titles = {
                "This is my TESTVALUE",
                "This one will not work",
                "Lowercase testvalues should work too",
                "Another fail",
                "This last TestValue should work"
            };
            List<NewsItem> list = (from title in titles
                                   select CreateFromTitle(title)).ToList();

            Filters.ApplyTextFilter(list, "TESTvalue");

            IEnumerable<string> result = from item in list
                                         select item.Title;
            string[] expectedResult = {
                titles[0],
                titles[2],
                titles[4]
            };
            Assert.True(CompareEnumerables(result, expectedResult));
        }


        private bool CompareEnumerables<T>(IEnumerable<T> enumerable1, IEnumerable<T> enumerable2)
        {
            Console.WriteLine("test");
            List<T> list1 = new List<T>(enumerable1);
            List<T> list2 = new List<T>(enumerable2);
            if(list1.Count != list2.Count)
                return false;
            for(int i = 0; i < list1.Count; i++)
            {
                Console.WriteLine(list1[i] + " ?= " + list2[i]);
                if(!list1[i].Equals(list2[i]))
                    return false;
            }
            return true;
        }

        private NewsItem CreateFromTitle(string title)
        {
            NewsItem item = new NewsItem()
            {
                Title = title
            };
            return item;
        }

    }
}
