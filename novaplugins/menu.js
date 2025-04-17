const { prefix, botName } = require('./config'); // Ensure your config file has necessary values

// Menu Command Handler
async function menuCommand(m) {
  const command = m.text.trim().slice(prefix.length).split(' ')[0];

  if (command === 'menu') {
    const menu = `
╭━━━━━━━【 ${botName} 】━━━━━━━╮
┃
┃ 👑 *Owner Commands*:
┃ ➸ ${prefix}owner - View owner info
┃ ➸ ${prefix}shutdown - Shutdown the bot
┃ ➸ ${prefix}restart - Restart the bot
┃ ➸ ${prefix}setprefix <newPrefix> - Change command prefix
┃ ➸ ${prefix}setlang <language> - Change the bot's language
┃ ➸ ${prefix}logs - View bot logs
┃ ➸ ${prefix}uptime - View bot uptime
┃ ➸ ${prefix}block <user> - Block a user
┃ ➸ ${prefix}unblock <user> - Unblock a user
┃
┃ 🛠️ *Admin Commands*:
┃ ➸ ${prefix}kick <user> - Kick a user from the group
┃ ➸ ${prefix}ban <user> - Ban a user from the group
┃ ➸ ${prefix}mute <user> - Mute a user
┃ ➸ ${prefix}unmute <user> - Unmute a user
┃ ➸ ${prefix}setwelcome <message> - Set a custom welcome message
┃ ➸ ${prefix}setgoodbye <message> - Set a custom goodbye message
┃ ➸ ${prefix}addadmin <user> - Add a user as admin
┃ ➸ ${prefix}removeadmin <user> - Remove a user as admin
┃ ➸ ${prefix}clearall - Clear all members in the group
┃
┃ 🎮 *Fun Commands*:
┃ ➸ ${prefix}joke - Get a random joke
┃ ➸ ${prefix}meme - Get a random meme
┃ ➸ ${prefix}quote - Get a random motivational quote
┃ ➸ ${prefix}flip - Flip a coin
┃ ➸ ${prefix}roll - Roll a dice
┃ ➸ ${prefix}8ball - Ask the Magic 8-Ball
┃ ➸ ${prefix}riddle - Solve a riddle
┃ ➸ ${prefix}love <name1> <name2> - Calculate love percentage
┃ ➸ ${prefix}cat - Get a random cat image
┃ ➸ ${prefix}dog - Get a random dog image
┃ ➸ ${prefix}facts - Get a random fun fact
┃ ➸ ${prefix}weather <city> - Get the weather forecast
┃
┃ 🔧 *Settings*:
┃ ➸ ${prefix}prefix <newPrefix> - Change the command prefix
┃ ➸ ${prefix}welcome <enable/disable> - Enable or disable welcome messages
┃ ➸ ${prefix}goodbye <enable/disable> - Enable or disable goodbye messages
┃ ➸ ${prefix}cooldown <seconds> - Set cooldown time between commands
┃ ➸ ${prefix}xp <enable/disable> - Enable or disable XP system
┃ ➸ ${prefix}lang <language> - Change the bot's language
┃ ➸ ${prefix}timezone <timezone> - Set the bot's timezone
┃ ➸ ${prefix}autorespond <enable/disable> - Enable or disable auto-response feature
┃ ➸ ${prefix}log <enable/disable> - Enable or disable logging
┃ ➸ ${prefix}resetsettings - Reset settings to default
┃
┃ 📚 *Search Commands*:
┃ ➸ ${prefix}search <query> - Search on Google
┃ ➸ ${prefix}image <query> - Search for images on Google
┃ ➸ ${prefix}video <query> - Search for videos on YouTube
┃ ➸ ${prefix}news <query> - Get the latest news
┃ ➸ ${prefix}define <word> - Get the definition of a word
┃ ➸ ${prefix}translate <text> - Translate text to another language
┃
┃ 📌 *Other Commands*:
┃ ➸ ${prefix}help - Get a list of all commands
┃ ➸ ${prefix}about - Get information about the bot
┃ ➸ ${prefix}ping - Check the bot's response time
┃ ➸ ${prefix}stats - Get bot statistics
┃ ➸ ${prefix}invite - Get the bot's invite link
┃ ➸ ${prefix}feedback <message> - Send feedback to the developers
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
  `;

    m.reply(menu);
  } else {
    m.reply(`Unknown command. Type ${prefix}menu to view the bot's menu.`);
  }
}

module.exports = { menuCommand };
