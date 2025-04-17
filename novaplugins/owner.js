const { prefix, ownerNumber } = require('./config'); // Ensure the config is correct

// Owner Command Handler
async function ownerCommand(m) {
  if (m.sender !== ownerNumber) {
    return m.reply("This command is only available to the bot owner.");
  }

  const command = m.text.trim().slice(prefix.length).split(' ')[0];

  switch(command) {
    case 'botinfo':
      // Example: Show bot information
      const botInfo = `BOT INFO\nName: NOVA-XMD\nPowered by: DARK_TECH\nUptime: 2 days 5 hours\nVersion: 1.0.0\nServer: Active\nMemory Usage: 60%`;
      m.reply(botInfo);
      break;

    case 'restart':
      // Restart the bot (common in hosted environments like Render or Heroku)
      m.reply("Restarting the bot...");
      process.exit();  // This will restart the bot if it's running in a Node.js environment
      break;

    case 'setprefix':
      // Example: Set a new command prefix for the bot
      const newPrefix = m.text.split(' ')[1];
      if (!newPrefix) {
        return m.reply("Please provide a new prefix.");
      }
      prefix = newPrefix;
      m.reply(`Command prefix has been set to: ${newPrefix}`);
      break;

    case 'botstats':
      // Example: Show bot system stats (memory, uptime, etc.)
      const stats = `BOT STATS\nMemory Usage: 60%\nCPU Usage: 15%\nActive Users: 120\nTotal Commands Used: 5400\nUptime: 2 days 5 hours`;
      m.reply(stats);
      break;

    case 'broadcast':
      // Broadcast a message to all users
      const message = m.text.slice(prefix.length + 'broadcast'.length).trim();
      if (!message) {
        return m.reply("Please provide a message to broadcast.");
      }
      // You can implement your own broadcast system here
      m.reply(`Broadcasting message: "${message}" to all users.`);
      // Add your broadcast logic here, depending on how you manage users.
      break;

    case 'shutdown':
      // Shut down the bot
      m.reply("Shutting down the bot...");
      process.exit();  // This will stop the bot if it's running in a Node.js environment
      break;

    case 'help':
      // Show all owner commands
      const ownerHelp = `OWNER COMMANDS\n1. *botinfo* - Show bot information\n2. *restart* - Restart the bot\n3. *setprefix [new prefix]* - Change command prefix\n4. *botstats* - Show system stats\n5. *broadcast [message]* - Broadcast message to all users\n6. *shutdown* - Shutdown the bot`;
      m.reply(ownerHelp);
      break;

    default:
      m.reply("Invalid owner command. Use 'help' for a list of available commands.");
  }
}

module.exports = { ownerCommand };
