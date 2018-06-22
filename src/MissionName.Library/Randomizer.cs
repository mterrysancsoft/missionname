using System;
using System.Collections.Generic;
using System.Text;

namespace MissionName.Library
{
    public class Randomizer
    {
        public double Seed { get; set; }

        /// <summary>
        /// Construct a predictable psuedo-randomizer with a seed value
        /// </summary>
        /// <param name="seed">initial seed value</param>
        public Randomizer(double seed = 123)
        {
            Seed = seed;
        }

        /// <summary>
        /// Returns the next generated random number between 0 and 1 as a double
        /// </summary>
        /// <returns>random number 0..1</returns>
        public double Next()
        {
            Seed = (Seed * 9301 + 49297) % 233280;
            double randomValue = Seed / 233280;
            return randomValue;
        }

        /// <summary>
        /// Returns the next random value as an integer within a range [min,max)
        /// </summary>
        /// <param name="min">minimum value inclusive</param>
        /// <param name="max">max value non-inclusive</param>
        /// <returns>random integer value</returns>
        public int Next(int min, int max)
        {
            double randomValue = Next();
            randomValue = min + (randomValue * (max - min));
            return (int)Math.Floor(randomValue);
        }

    }
}
