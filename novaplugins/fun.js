const axios = require('axios');
const { prefix } = require('./config'); // Ensure your config file is correct

// Fun Command Handler
async function funCommand(m) {
  const command = m.text.trim().slice(prefix.length).split(' ')[0];

  switch(command) {
    case 'joke':
      // Fetch a random joke from an API
      try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = response.data;
        m.reply(`${joke.setup}\n\n${joke.punchline}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a joke at the moment.");
      }
      break;

    case 'meme':
      // Fetch a random meme from the Meme API
      try {
        const response = await axios.get('https://meme-api.herokuapp.com/gimme');
        const meme = response.data.url;
        m.reply(`Here is a random meme for you:\n${meme}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a meme at the moment.");
      }
      break;

    case 'quote':
      // Fetch a random motivational quote
      try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;
        m.reply(`"${quote.content}"\n- ${quote.author}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a quote at the moment.");
      }
      break;

    case 'flip':
      // Flip a coin
      const flipResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
      m.reply(`The coin landed on: ${flipResult}`);
      break;

    case 'roll':
      // Roll a dice
      const rollResult = Math.floor(Math.random() * 6) + 1;
      m.reply(`You rolled a: ${rollResult}`);
      break;

    case '8ball':
      // Magic 8 ball response
      const responses = [
        "Yes.",
        "No.",
        "Maybe.",
        "Ask again later.",
        "Definitely.",
        "I don't think so.",
        "Most likely.",
        "Absolutely not."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      m.reply(`Magic 8 Ball says: ${randomResponse}`);
      break;

    case 'riddle':
      // Fetch a random riddle
      try {
        const response = await axios.get('https://riddleapi.com/api/random');
        const riddle = response.data;
        m.reply(`Riddle: ${riddle.question}\nAnswer: ${riddle.answer}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a riddle at the moment.");
      }
      break;

    case 'truth':
      // Truth or dare: Give a truth prompt
      const truthPrompts = [
        "What is your biggest fear?",
        "What is your most embarrassing moment?",
        "Have you ever lied to someone important to you?",
        "What secret have you kept from your best friend?",
        "What’s the most trouble you’ve been in?"
      ];
      const randomTruth = truthPrompts[Math.floor(Math.random() * truthPrompts.length)];
      m.reply(`Truth: ${randomTruth}`);
      break;

    case 'dare':
      // Truth or dare: Give a dare prompt
      const darePrompts = [
        "Dance like nobody's watching.",
        "Send a voice message to your best friend saying 'I love you.'",
        "Imitate an animal of your choice.",
        "Post something silly on your social media.",
        "Do 10 pushups."
      ];
      const randomDare = darePrompts[Math.floor(Math.random() * darePrompts.length)];
      m.reply(`Dare: ${randomDare}`);
      break;

    case 'love':
      // Calculate love percentage between two people
      const names = m.text.slice(prefix.length + 'love'.length).trim();
      if (!names || !names.includes(' ')) {
        return m.reply("Please provide two names to calculate the love percentage (e.g., /love John Jane).");
      }
      const [name1, name2] = names.split(' ');
      const lovePercentage = Math.floor(Math.random() * 101);
      m.reply(`The love compatibility between ${name1} and ${name2} is ${lovePercentage}%!`);
      break;

    case 'cat':
      // Fetch a random cat picture
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        const catImage = response.data[0].url;
        m.reply(`Here is a random cat picture for you:\n${catImage}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a cat picture at the moment.");
      }
      break;

    case 'dog':
      // Fetch a random dog picture
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        const dogImage = response.data.message;
        m.reply(`Here is a random dog picture for you:\n${dogImage}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a dog picture at the moment.");
      }
      break;

    case 'facts':
      // Fetch a random fact
      try {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const fact = response.data.text;
        m.reply(`Did you know? ${fact}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch a fact at the moment.");
      }
      break;

    default:
      m.reply("Invalid fun command. Use 'help' to see the available commands.");
  }
}

module.exports = { funCommand };
