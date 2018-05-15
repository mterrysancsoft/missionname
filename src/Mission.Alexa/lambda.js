/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

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

const TodaysMissionHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'TodaysMissionIntent');
  },
  handle(handlerInput) {
    var currentTime = new Date();

    // re-seed the random number generator so we get the same mision for the day
    Math.seed = currentTime.getDate() + currentTime.getMonth() * 31 +  currentTime.getFullYear() * 372;
    // get a random adjective and noun to name the mission
    const adjectiveIndex = Math.floor(Math.seededRandom(0, adjectives.length ));
    const nounIndex = Math.floor(Math.seededRandom(0, nouns.length));
    // construct the output for voice and display
    const speechOutput = SPEECH_MISSION_PREAMBLE + adjectives[adjectiveIndex] + " " + nouns[nounIndex];
    const cardOutput = CARD_MISSION_PREAMBLE + adjectives[adjectiveIndex] + " " + nouns[nounIndex];

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, cardOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'XCOM Mission';
const SPEECH_MISSION_PREAMBLE = "Hello Commander. Today\'s Mission is: Operation ";
const CARD_MISSION_PREAMBLE = "Operation ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

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

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    TodaysMissionHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
