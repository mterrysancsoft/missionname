using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MissionName.Library;
using MissionName.Library.Models;

namespace MissionName.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MissionController : Controller
    {
        MissionFactory missionFactory;

        public MissionController()
        {
            string dataDir = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();

            missionFactory = new MissionFactory(System.IO.Path.Combine(dataDir, "adjectives.txt"), System.IO.Path.Combine(dataDir, "nouns.txt"));
        }

        public string Get()
        {
            return missionFactory.Random().Name;
        }

        [HttpGet("Today", Name = "TodaysMission")]
        public string Today()
        {
            return missionFactory.Today().Name;
        }

        [HttpGet("Daily/{dt}", Name = "DailyMission")]
        public string Daily(DateTime dt)
        {
            return missionFactory.Daily(dt).Name;
        }
    }
}