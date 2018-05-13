namespace MissionName.Library.Models
{
    public class Mission
    {
        public Mission()
        {
            Adjective = "Anonymous";
            Noun = "Placeholder";
        }

        public Mission(string adjective, string noun)
        {
            Adjective = adjective;
            Noun = noun;
        }

        public string Adjective { get; set; }
        public string Noun { get; set; }
        public string Name
        {
            get
            {
                return Adjective + " " + Noun;
            }
        }
    }
}
