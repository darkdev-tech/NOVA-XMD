const { MessageType } = require('@adiwajshing/baileys');

// Menu for NOVA-XMD POWERED BY DARK TECH

module.exports = {
  name: 'menu',
  description: 'Displays the main menu for NOVA-XMD POWERED BY DARK TECH.',
  async execute(message, client) {
    const menuText = `
      *NOVA-XMD POWERED BY DARK TECH - Command Menu*

      👑 *Owner Commands*:
      ➡️ /ownerhelp - Display owner help menu
      ➡️ /restart - Restart the bot
      ➡️ /broadcast - Broadcast a message to all groups
      ➡️ /setprefix - Change the bot prefix

      ⚙️ *Settings Commands*:
      ➡️ /setwelcome - Set a welcome message for new members
      ➡️ /setgoodbye - Set a goodbye message for members who leave
      ➡️ /setgroupname - Set the group name
      ➡️ /setlang - Set the language for the group

      🔍 *Search Commands*:
      ➡️ /google <query> - Search Google for a query
      ➡️ /imdb <movie/tv-show> - Search IMDb for a movie or TV show
      ➡️ /anime <anime name> - Search for an anime

      🎉 *Fun Commands*:
      ➡️ /joke - Get a random joke
      ➡️ /meme - Get a random meme
      ➡️ /randomfact - Get a random fun fact
      ➡️ /8ball <question> - Ask the Magic 8-Ball a question
      ➡️ /quote - Get a random inspirational quote

      🎮 *Group Commands*:
      ➡️ /add <user> - Add a user to the group
      ➡️ /kick <user> - Remove a user from the group
      ➡️ /promote <user> - Promote a user to admin
      ➡️ /demote <user> - Demote an admin to member
      ➡️ /setlanguage <language> - Set the language for the group
    `;

    const options = {
      quoted: message,
      contextInfo: {
        mentionedJid: [message.sender]
      },
      messageType: MessageType.text,
    };

    await message.reply(menuText, options);
  }
};
