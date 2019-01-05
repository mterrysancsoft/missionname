require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => { 
    console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
    console.log('Message: ' + msg);
    if (msg.content === '!today') {
        var currentTime = new Date();
        // re-seed the random number generator so we get the same mision for the day
        Math.seed = currentTime.getDate() + currentTime.getMonth() * 31 +  currentTime.getFullYear() * 372;
        // get a random adjective and noun to name the mission
        const adjectiveIndex = Math.floor(Math.seededRandom(0, adjectives.length));
        const nounIndex = Math.floor(Math.seededRandom(0, nouns.length));
        const missionText = SPEECH_TODAY_PREAMBLE + adjectives[adjectiveIndex] + " " + nouns[nounIndex];
        msg.channel.send(missionText);
    } else if (msg.content === '!mission') {
        // get a random adjective and noun to name the mission
        const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
        const nounIndex = Math.floor(Math.random() * nouns.length);
        const missionText = SPEECH_RANDOM_PREAMBLE + adjectives[adjectiveIndex] + " " + nouns[nounIndex];
        msg.channel.send(missionText);
    } else if (msg.content === '!help') {
        msg.channel.send(missionText);
    } 
});

// create a .env file containing DISCORD_SECRET = "the discord secret client token" on a single line
client.login(process.env.DISCORD_SECRET);

// define a seed value for the seeded random number generator 
Math.seed = 123;

// support seeded pseudo-random numbers so that we can get consistent results
// on a given seed (used to generate consisten results per day)
Math.seededRandom = function(min,max) {
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;
    rnd = min + (rnd * (max-min));
    return Math.trunc(rnd);
}

const SPEECH_TODAY_PREAMBLE = "Hello Commander. Today\'s Mission is Operation ";
const SPEECH_RANDOM_PREAMBLE = "Hello Commander. The Mission is Operation ";
const SPEECH_HELP = "Hello Commander. Available commands are '!today', '!mission' and '!help'.";

const adjectives = [
    "Swift",
    "Unceasing",
    "Vengeful",
    "Lone",
    "Cold",
    "Hot",
    "Purple",
    "Brutal",
    "Flying",
    "Driving",
    "Blind",
    "Demon",
    "Enduring",
    "Defiant",
    "Lost",
    "Dying",
    "Falling",
    "Soaring",
    "Twisted",
    "Glass",
    "Bleeding",
    "Broken",
    "Silent",
    "Red",
    "Black",
    "Dark",
    "Fallen",
    "Patient",
    "Burning",
    "Final",
    "Lazy",
    "Morbid",
    "Crimson",
    "Cursed",
    "Frozen",
    "Bloody",
    "Banished",
    "First",
    "Severed",
    "Empty",
    "Spectral",
    "Sacred",
    "Stone",
    "Shattered",
    "Hidden",
    "Rotting",
    "Devil\'s",
    "Forgotten",
    "Blinding",
    "Fading",
    "Crystal",
    "Secret",
    "Cryptic"
];

const nouns = [
    "Engine",
    "Chant",
    "Heart",
    "Justice",
    "Law",
    "Thunder",
    "Moon",
    "Heat",
    "Fear",
    "Star",
    "Apollo",
    "Prophet",
    "Hero",
    "Hydra",
    "Serpent",
    "Crown",
    "Thorn",
    "Empire",
    "Line",
    "Fall",
    "Summer",
    "Druid",
    "God",
    "Savior",
    "Stallion",
    "Hawk",
    "Vengeance",
    "Calm",
    "Knife",
    "Sword",
    "Dream",
    "Sleep",
    "Stroke",
    "Flame",
    "Spark",
    "Fist",
    "Dirge",
    "Grave",
    "Shroud",
    "Breath",
    "Smoke",
    "Giant",
    "Whisper",
    "Night",
    "Throne",
    "Pipe",
    "Blade",
    "Daze",
    "Pyre",
    "Tears",
    "Mother",
    "Crone",
    "King",
    "Father",
    "Priest",
    "Dawn",
    "Hammer",
    "Shield",
    "Hymn",
    "Vanguard",
    "Sentinel",
    "Stranger",
    "Bell",
    "Mist",
    "Fog",
    "Jester",
    "Scepter",
    "Ring",
    "Skull",
    "Paramour",
    "Palace",
    "Mountain",
    "Rain",
    "Gaze",
    "Future",
    "GiftEngine",
    "Chant",
    "Heart",
    "Justice",
    "Law",
    "Thunder",
    "Moon",
    "Heat",
    "Fear",
    "Star",
    "Apollo",
    "Prophet",
    "Hero",
    "Hydra",
    "Serpent",
    "Crown",
    "Thorn",
    "Empire",
    "Line",
    "Fall",
    "Summer",
    "Druid",
    "God",
    "Savior",
    "Stallion",
    "Hawk",
    "Vengeance",
    "Calm",
    "Knife",
    "Sword",
    "Dream",
    "Sleep",
    "Stroke",
    "Flame",
    "Spark",
    "Fist",
    "Dirge",
    "Grave",
    "Shroud",
    "Breath",
    "Smoke",
    "Giant",
    "Whisper",
    "Night",
    "Throne",
    "Pipe",
    "Blade",
    "Daze",
    "Pyre",
    "Tears",
    "Mother",
    "Crone",
    "King",
    "Father",
    "Priest",
    "Dawn",
    "Hammer",
    "Shield",
    "Hymn",
    "Vanguard",
    "Sentinel",
    "Stranger",
    "Bell",
    "Mist",
    "Fog",
    "Jester",
    "Scepter",
    "Ring",
    "Skull",
    "Paramour",
    "Palace",
    "Mountain",
    "Rain",
    "Gaze",
    "Future",
    "Gift"
];
