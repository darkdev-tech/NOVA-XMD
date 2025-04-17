const axios = require('axios');
const { MessageType } = require('@adiwajshing/baileys');

// Search Commands for NOVA-XMD POWERED BY DARK TECH

module.exports = {
  name: 'searchCommands',
  description: 'Search commands for NOVA-XMD POWERED BY DARK TECH.',
  async execute(message, client, args) {
    const command = args[0];

    // Handle different search commands
    switch (command.toLowerCase()) {
      case 'google':
        await googleSearchCommand(message, args);
        break;

      case 'imdb':
        await imdbSearchCommand(message, args);
        break;

      case 'anime':
        await animeSearchCommand(message, args);
        break;

      default:
        message.reply('Unknown search command. Use `google`, `imdb`, or `anime`.');
    }
  }
};

// Google Search Command: Searches Google using a simple query
async function googleSearchCommand(message, args) {
  const query = args.slice(1).join(' ');
  if (!query) {
    return message.reply('Please provide a search query for Google.');
  }

  try {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=YOUR_GOOGLE_API_KEY&cx=YOUR_CUSTOM_SEARCH_ENGINE_ID`;
    const response = await axios.get(searchUrl);
    const items = response.data.items;

    if (!items || items.length === 0) {
      return message.reply('No results found for your query.');
    }

    let searchResults = items.slice(0, 5).map((item, index) => {
      return `${index + 1}. ${item.title}\n${item.link}\n${item.snippet}\n`;
    }).join('\n');

    await message.reply(`**Google Search Results for: ${query}**\n\n${searchResults}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while searching Google.');
  }
}

// IMDb Search Command: Searches IMDb for movie or TV show details
async function imdbSearchCommand(message, args) {
  const query = args.slice(1).join(' ');
  if (!query) {
    return message.reply('Please provide a movie or TV show name to search on IMDb.');
  }

  try {
    const searchUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=YOUR_OMDB_API_KEY`;
    const response = await axios.get(searchUrl);
    const data = response.data;

    if (data.Response === 'False') {
      return message.reply(`No results found for "${query}" on IMDb.`);
    }

    const imdbDetails = `
      **Title**: ${data.Title}
      **Year**: ${data.Year}
      **Genre**: ${data.Genre}
      **Director**: ${data.Director}
      **Actors**: ${data.Actors}
      **Plot**: ${data.Plot}
      **IMDB Rating**: ${data.imdbRating}
      **Link**: [IMDb Link](https://www.imdb.com/title/${data.imdbID})
    `;
    await message.reply(imdbDetails);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while searching IMDb.');
  }
}

// Anime Search Command: Searches for anime details
async function animeSearchCommand(message, args) {
  const query = args.slice(1).join(' ');
  if (!query) {
    return message.reply('Please provide an anime name to search.');
  }

  try {
    const searchUrl = `https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(query)}&page=1`;
    const response = await axios.get(searchUrl);
    const animeData = response.data.results[0];

    if (!animeData) {
      return message.reply(`No results found for anime "${query}".`);
    }

    const animeDetails = `
      **Title**: ${animeData.title}
      **Genre**: ${animeData.genres.map((genre) => genre.name).join(', ')}
      **Episodes**: ${animeData.episodes}
      **Score**: ${animeData.score}
      **Aired**: ${animeData.start_date} to ${animeData.end_date}
      **Description**: ${animeData.synopsis}
      **Link**: [Anime Link](${animeData.url})
    `;
    await message.reply(animeDetails);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while searching for the anime.');
  }
}
