using System;
using System.IO;
using System.Collections.Generic;
using MissionName.Library.Models;

namespace MissionName.Library
{
    public class MissionFactory
    {
        protected List<string> adjectives;
        protected List<string> nouns;
        protected Random random;

        public MissionFactory()
        {
            random = new System.Random();
            adjectives = new List<string>();
            nouns = new List<string>();
            adjectives.Add("No");
            nouns.Add("Data");
        }

        public MissionFactory(string adjPath, string nounPath)
        {
            random = new System.Random();
            adjectives = new List<string>(File.ReadAllLines(adjPath));
            nouns = new List<string>(File.ReadAllLines(nounPath));
        }

        protected Mission PseudoRandom(Random r)
        {
            int adjIndex = r.Next(0, adjectives.Count);
            int nounIndex = r.Next(0, nouns.Count);
            return new Mission(adjectives[adjIndex], nouns[nounIndex]);
        }

        public Mission Daily(DateTime date)
        {
            Random r = new System.Random(date.DayOfYear + date.Year * 1000);
            return PseudoRandom(r);
        }

        public Mission Today()
        {
            return Daily(DateTime.Today);
        }

        public Mission Random()
        {
            return PseudoRandom(random);
        }
        public Mission Static(int value)
        {
            Random random = new System.Random(value);
            return PseudoRandom(random);
        }
    }
}
