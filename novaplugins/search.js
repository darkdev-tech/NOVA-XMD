const axios = require('axios');
const { prefix } = require('./config'); // Ensure your config file is correct

// Search Command Handler
async function searchCommand(m) {
  const command = m.text.trim().slice(prefix.length).split(' ')[0];

  switch(command) {
    case 'google':
      // Google search
      const queryGoogle = m.text.slice(prefix.length + 'google'.length).trim();
      if (!queryGoogle) {
        return m.reply("Please provide a search query.");
      }
      try {
        const response = await axios.get(`https://api.duckduckgo.com/?q=${queryGoogle}&format=json`);
        const results = response.data.RelatedTopics.map(item => item.Text).slice(0, 5).join('\n');
        m.reply(`Here are the search results for "${queryGoogle}":\n\n${results}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the results at this moment.");
      }
      break;

    case 'image':
      // Image search
      const queryImage = m.text.slice(prefix.length + 'image'.length).trim();
      if (!queryImage) {
        return m.reply("Please provide an image search query.");
      }
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${queryImage}&client_id=YOUR_UNSPLASH_API_KEY`);
        const imageUrl = response.data.results[0]?.urls.full;
        if (imageUrl) {
          m.reply(imageUrl);
        } else {
          m.reply("No images found for that search.");
        }
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the image at this moment.");
      }
      break;

    case 'video':
      // YouTube search (YouTube API integration required)
      const queryVideo = m.text.slice(prefix.length + 'video'.length).trim();
      if (!queryVideo) {
        return m.reply("Please provide a video search query.");
      }
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            maxResults: 1,
            q: queryVideo,
            key: 'YOUR_YOUTUBE_API_KEY',
          }
        });
        const video = response.data.items[0];
        if (video) {
          m.reply(`Here is a YouTube video: https://www.youtube.com/watch?v=${video.id.videoId}`);
        } else {
          m.reply("No videos found for that search.");
        }
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the video at this moment.");
      }
      break;

    case 'news':
      // News search (News API integration required)
      const queryNews = m.text.slice(prefix.length + 'news'.length).trim();
      if (!queryNews) {
        return m.reply("Please provide a news search query.");
      }
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            q: queryNews,
            apiKey: 'YOUR_NEWS_API_KEY',
          }
        });
        const articles = response.data.articles.slice(0, 5).map(article => `- ${article.title}\n${article.url}`).join('\n\n');
        m.reply(`Here are the top news results for "${queryNews}":\n\n${articles}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the news at this moment.");
      }
      break;

    case 'wiki':
      // Wikipedia search
      const queryWiki = m.text.slice(prefix.length + 'wiki'.length).trim();
      if (!queryWiki) {
        return m.reply("Please provide a Wikipedia search query.");
      }
      try {
        const response = await axios.get(`https://en.wikipedia.org/w/api.php`, {
          params: {
            action: 'query',
            list: 'search',
            srsearch: queryWiki,
            format: 'json',
          }
        });
        const results = response.data.query.search.slice(0, 5).map(item => `- ${item.title}\nhttps://en.wikipedia.org/?curid=${item.pageid}`).join('\n\n');
        m.reply(`Here are the Wikipedia search results for "${queryWiki}":\n\n${results}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the Wikipedia results at this moment.");
      }
      break;

    case 'weather':
      // Weather search (Weather API integration required)
      const queryWeather = m.text.slice(prefix.length + 'weather'.length).trim();
      if (!queryWeather) {
        return m.reply("Please provide a location for the weather.");
      }
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: queryWeather,
            appid: 'YOUR_OPENWEATHER_API_KEY',
            units: 'metric', // Temperature in Celsius
          }
        });
        const weather = response.data;
        const weatherInfo = `
Weather for ${weather.name}:
- Temperature: ${weather.main.temp}°C
- Weather: ${weather.weather[0].description}
- Wind Speed: ${weather.wind.speed} m/s
        `;
        m.reply(weatherInfo);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the weather at this moment.");
      }
      break;

    case 'define':
      // Word definition search (using a dictionary API)
      const wordToDefine = m.text.slice(prefix.length + 'define'.length).trim();
      if (!wordToDefine) {
        return m.reply("Please provide a word to define.");
      }
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine}`);
        const definition = response.data[0].meanings[0].definitions[0].definition;
        m.reply(`Definition of ${wordToDefine}: ${definition}`);
      } catch (error) {
        m.reply("Sorry, I couldn't fetch the definition at this moment.");
      }
      break;

    default:
      m.reply("Invalid search command. Use 'help' to see the available commands.");
  }
}

module.exports = { searchCommand };
