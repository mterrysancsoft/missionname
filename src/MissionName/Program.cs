using System;
using MissionName.Library;
using MissionName.Library.Models;

namespace MissionName
{
    class Program
    {
        static void Main(string[] args)
        {
            MissionFactory mf = new MissionFactory(@"..\..\..\..\Mission.Data\adjectives.txt", @"..\..\..\..\\Mission.Data\nouns.txt");
            Mission m = new Mission();

            // default mission
            Console.WriteLine("Default mission = " + m.Name);

            // Random missions
            Console.WriteLine("Random mission 1 = " + mf.Random().Name);
            Console.WriteLine("Random mission 2 = " + mf.Random().Name);
            Console.WriteLine("Random mission 3 = " + mf.Random().Name);
            Console.WriteLine("Random mission 4 = " + mf.Random().Name);
            Console.WriteLine("Random mission 5 = " + mf.Random().Name);

            // Daily missions
            for (DateTime dt = DateTime.Today.AddDays(-4); dt <= DateTime.Today; dt = dt.AddDays(1))
            {
                Console.WriteLine("Daily mission = " + mf.Daily(dt).Name);
            }

            // Today's mission - should not change
            Console.WriteLine("Today's mission = " + mf.Today().Name);
            Console.WriteLine("Today's mission = " + mf.Today().Name);

            // Static missions - should be consistent based on the seed
            Console.WriteLine("Static mission 1 = " + mf.Static(1).Name);
            Console.WriteLine("Static mission 2 = " + mf.Static(2).Name);
            Console.WriteLine("Static mission 1 again = " + mf.Static(1).Name);
        }
    }
}
