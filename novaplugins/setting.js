const { prefix, settings } = require('./config'); // Ensure your config file is correct

// Settings Command Handler
async function settingsCommand(m) {
  const command = m.text.trim().slice(prefix.length).split(' ')[0];

  switch(command) {
    case 'prefix':
      // Change the command prefix
      const newPrefix = m.text.slice(prefix.length + 'prefix'.length).trim();
      if (!newPrefix) {
        return m.reply("Please provide a new prefix.");
      }
      settings.prefix = newPrefix;
      m.reply(`Prefix has been changed to: ${newPrefix}`);
      break;

    case 'welcome':
      // Enable or disable welcome message in groups
      const actionWelcome = m.text.slice(prefix.length + 'welcome'.length).trim().toLowerCase();
      if (actionWelcome === 'enable') {
        settings.welcomeMessage = true;
        m.reply("Welcome message has been enabled.");
      } else if (actionWelcome === 'disable') {
        settings.welcomeMessage = false;
        m.reply("Welcome message has been disabled.");
      } else {
        m.reply("Please specify 'enable' or 'disable' to toggle welcome messages.");
      }
      break;

    case 'goodbye':
      // Enable or disable goodbye message in groups
      const actionGoodbye = m.text.slice(prefix.length + 'goodbye'.length).trim().toLowerCase();
      if (actionGoodbye === 'enable') {
        settings.goodbyeMessage = true;
        m.reply("Goodbye message has been enabled.");
      } else if (actionGoodbye === 'disable') {
        settings.goodbyeMessage = false;
        m.reply("Goodbye message has been disabled.");
      } else {
        m.reply("Please specify 'enable' or 'disable' to toggle goodbye messages.");
      }
      break;

    case 'xp':
      // Enable or disable XP system
      const actionXp = m.text.slice(prefix.length + 'xp'.length).trim().toLowerCase();
      if (actionXp === 'enable') {
        settings.xpSystem = true;
        m.reply("XP system has been enabled.");
      } else if (actionXp === 'disable') {
        settings.xpSystem = false;
        m.reply("XP system has been disabled.");
      } else {
        m.reply("Please specify 'enable' or 'disable' to toggle the XP system.");
      }
      break;

    case 'autorespond':
      // Enable or disable auto-response feature
      const actionAutoRespond = m.text.slice(prefix.length + 'autorespond'.length).trim().toLowerCase();
      if (actionAutoRespond === 'enable') {
        settings.autoRespond = true;
        m.reply("Auto-response has been enabled.");
      } else if (actionAutoRespond === 'disable') {
        settings.autoRespond = false;
        m.reply("Auto-response has been disabled.");
      } else {
        m.reply("Please specify 'enable' or 'disable' to toggle auto-response.");
      }
      break;

    case 'cooldown':
      // Set the cooldown time for commands
      const cooldownTime = m.text.slice(prefix.length + 'cooldown'.length).trim();
      if (!cooldownTime || isNaN(cooldownTime)) {
        return m.reply("Please provide a valid number for the cooldown time (in seconds).");
      }
      settings.cooldown = parseInt(cooldownTime);
      m.reply(`Cooldown time has been set to: ${cooldownTime} seconds.`);
      break;

    case 'lang':
      // Change the bot's language
      const newLang = m.text.slice(prefix.length + 'lang'.length).trim().toLowerCase();
      const availableLanguages = ['english', 'spanish', 'french', 'german', 'italian'];
      if (availableLanguages.includes(newLang)) {
        settings.language = newLang;
        m.reply(`Bot language has been changed to: ${newLang}`);
      } else {
        m.reply("Please specify a valid language (e.g., 'english', 'spanish').");
      }
      break;

    case 'timezone':
      // Set the bot's timezone
      const newTimezone = m.text.slice(prefix.length + 'timezone'.length).trim();
      if (!newTimezone) {
        return m.reply("Please provide a valid timezone (e.g., 'GMT+0', 'GMT-4').");
      }
      settings.timezone = newTimezone;
      m.reply(`Bot's timezone has been changed to: ${newTimezone}`);
      break;

    case 'admin':
      // Add or remove an admin from the bot
      const adminAction = m.text.slice(prefix.length + 'admin'.length).trim().split(' ')[0];
      const adminNumber = m.text.slice(prefix.length + 'admin'.length).trim().split(' ')[1];
      if (adminAction === 'add' && adminNumber) {
        settings.admins.push(adminNumber);
        m.reply(`${adminNumber} has been added as an admin.`);
      } else if (adminAction === 'remove' && adminNumber) {
        const index = settings.admins.indexOf(adminNumber);
        if (index > -1) {
          settings.admins.splice(index, 1);
          m.reply(`${adminNumber} has been removed as an admin.`);
        } else {
          m.reply(`${adminNumber} is not an admin.`);
        }
      } else {
        m.reply("Please provide a valid action ('add' or 'remove') and admin number.");
      }
      break;

    case 'log':
      // Enable or disable logging
      const actionLog = m.text.slice(prefix.length + 'log'.length).trim().toLowerCase();
      if (actionLog === 'enable') {
        settings.logging = true;
        m.reply("Logging has been enabled.");
      } else if (actionLog === 'disable') {
        settings.logging = false;
        m.reply("Logging has been disabled.");
      } else {
        m.reply("Please specify 'enable' or 'disable' to toggle logging.");
      }
      break;

    case 'reset':
      // Reset all settings to default
      settings = {
        prefix: '!', // Default prefix
        welcomeMessage: true,
        goodbyeMessage: true,
        xpSystem: true,
        autoRespond: true,
        cooldown: 5, // Default cooldown in seconds
        language: 'english',
        timezone: 'GMT+0',
        admins: [],
        logging: true,
      };
      m.reply("All settings have been reset to default.");
      break;

    default:
      m.reply("Invalid settings command. Use 'help' to see the available settings commands.");
  }
}

module.exports = { settingsCommand };
