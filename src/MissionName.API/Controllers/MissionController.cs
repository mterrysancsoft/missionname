using System;
using Microsoft.AspNetCore.Mvc;
using MissionName.Library;

namespace MissionName.API.Controllers
{
    /// <summary>
    /// Retrieve generated mission names
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MissionController : Controller
    {
        MissionFactory missionFactory;

        /// <summary>
        /// General constructor - looks for word data in the Data Directory and builds the mission name factory
        /// </summary>
        public MissionController()
        {
            string dataDir = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();

            missionFactory = new MissionFactory(System.IO.Path.Combine(dataDir, "adjectives.txt"), System.IO.Path.Combine(dataDir, "nouns.txt"));
        }

        /// <summary>
        /// Generates a random mission name as a string
        /// </summary>
        /// <returns>Mission name in Adjective Noun format</returns>
        [HttpGet]
        public string Get()
        {
            return missionFactory.Random().Name;
        }

        /// <summary>
        /// Generates a consistent mission name for today's date
        /// </summary>
        /// <returns>Mission name in Adjective Noun format</returns>
        [HttpGet("Today", Name = "TodaysMission")]
        public string Today()
        {
            return missionFactory.Today().Name;
        }

        /// <summary>
        /// Generates a consisten mission name for the supplied date
        /// </summary>
        /// <param name="dt">Date for the mission</param>
        /// <returns>Mission name in Adjective Noun format</returns>
        [HttpGet("Daily/{dt}", Name = "DailyMission")]
        public string Daily(DateTime dt)
        {
            return missionFactory.Daily(dt).Name;
        }

        /// <summary>
        /// Generates a consistent mission based on the supplied seed value
        /// </summary>
        /// <param name="id">Seed value for the random generator</param>
        /// <returns>Mission name in Adjective Noun format</returns>
        [HttpGet("Static/{id}", Name = "StaticMission")]
        public string Static(int id)
        {
            return missionFactory.Static(id).Name;
        }

    }
}