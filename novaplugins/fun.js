const axios = require('axios');
const { MessageType } = require('@adiwajshing/baileys');

// Fun Commands for NOVA-XMD POWERED BY DARK TECH

module.exports = {
  name: 'funCommands',
  description: 'Fun commands for NOVA-XMD POWERED BY DARK TECH.',
  async execute(message, client, args) {
    const command = args[0];

    // Handle different fun commands
    switch (command.toLowerCase()) {
      case 'joke':
        await jokeCommand(message);
        break;

      case 'meme':
        await memeCommand(message);
        break;

      case 'randomfact':
        await randomFactCommand(message);
        break;

      case '8ball':
        await eightBallCommand(message, args);
        break;

      case 'quote':
        await quoteCommand(message);
        break;

      default:
        message.reply('Unknown fun command. Use `joke`, `meme`, `randomfact`, `8ball`, or `quote`.');
    }
  }
};

// Joke Command: Fetches a random joke
async function jokeCommand(message) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const joke = response.data;
    await message.reply(`${joke.setup}\n\n${joke.punchline}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while fetching a joke.');
  }
}

// Meme Command: Fetches a random meme image
async function memeCommand(message) {
  try {
    const response = await axios.get('https://meme-api.herokuapp.com/gimme');
    const meme = response.data;
    const memeImage = meme.url;

    await message.reply(memeImage);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while fetching a meme.');
  }
}

// Random Fact Command: Fetches a random fun fact
async function randomFactCommand(message) {
  try {
    const response = await axios.get('https://api.fungenerators.com/fact/random');
    const fact = response.data.contents.fact;

    await message.reply(`Did you know?\n\n${fact}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while fetching a random fact.');
  }
}

// 8Ball Command: The classic "Magic 8-Ball" for fun answers
async function eightBallCommand(message, args) {
  const question = args.slice(1).join(' ');
  if (!question) {
    return message.reply('Please ask a question for the Magic 8-Ball.');
  }

  const responses = [
    'Yes',
    'No',
    'Maybe',
    'Definitely not',
    'Absolutely',
    'I have no idea',
    'Ask again later',
    'Cannot predict now'
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  await message.reply(`Question: ${question}\nAnswer: ${randomResponse}`);
}

// Quote Command: Fetches a random inspirational or famous quote
async function quoteCommand(message) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;

    await message.reply(`" ${quote.content} "\n\n- ${quote.author}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while fetching a quote.');
  }
      }
