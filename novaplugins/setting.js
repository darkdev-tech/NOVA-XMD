const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys');

module.exports = {
  name: 'settingsCommands',
  description: 'Bot settings commands for NOVA-XMD POWERED BY DARK TECH.',
  async execute(message, client, args) {
    const command = args[0];

    // Ensure the message is from an admin
    if (!message.isGroup) {
      return message.reply('This command can only be used in a group.');
    }

    const group = await message.getGroupMetadata();
    const adminList = group.participants.filter((p) => p.isAdmin);

    if (!adminList.some((admin) => admin.id === message.sender.id)) {
      return message.reply('You must be an admin to use this command.');
    }

    // Handle different setting commands
    switch (command.toLowerCase()) {
      case 'setprefix':
        await setPrefixCommand(message, args, client);
        break;

      case 'setlanguage':
        await setLanguageCommand(message, args, client);
        break;

      case 'getsettings':
        await getSettingsCommand(message, client);
        break;

      case 'resetsettings':
        await resetSettingsCommand(message, client);
        break;

      default:
        message.reply('Unknown setting command. Use `setprefix`, `setlanguage`, `getsettings`, or `resetsettings`.');
    }
  }
};

// Set bot prefix command: Changes the bot's command prefix
async function setPrefixCommand(message, args, client) {
  const newPrefix = args[1];
  if (!newPrefix) {
    return message.reply('Please provide a new prefix.');
  }

  try {
    // Load existing settings or initialize if not available
    let settings = await loadSettings();
    settings.prefix = newPrefix;

    // Save the updated settings
    await saveSettings(settings);
    await message.reply(`Bot prefix has been changed to: ${newPrefix}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to change the prefix.');
  }
}

// Set bot language command: Changes the bot's language
async function setLanguageCommand(message, args, client) {
  const newLanguage = args[1];
  if (!newLanguage) {
    return message.reply('Please provide a new language (e.g., "en", "es").');
  }

  try {
    // Load existing settings or initialize if not available
    let settings = await loadSettings();
    settings.language = newLanguage;

    // Save the updated settings
    await saveSettings(settings);
    await message.reply(`Bot language has been changed to: ${newLanguage}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to change the language.');
  }
}

// Get current bot settings command: Fetches and displays the current settings
async function getSettingsCommand(message, client) {
  try {
    const settings = await loadSettings();
    const currentSettings = `
      Bot Prefix: ${settings.prefix || 'Not set'}
      Bot Language: ${settings.language || 'Not set'}
    `;
    await message.reply(`Current bot settings:\n${currentSettings}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to fetch the settings.');
  }
}

// Reset bot settings command: Resets settings to default
async function resetSettingsCommand(message, client) {
  try {
    // Reset to default settings
    const defaultSettings = {
      prefix: '/',
      language: 'en'
    };

    // Save default settings
    await saveSettings(defaultSettings);
    await message.reply('Bot settings have been reset to default values.');
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to reset the settings.');
  }
}

// Load settings from a JSON file (simulate reading settings from a file)
async function loadSettings() {
  return new Promise((resolve, reject) => {
    fs.readFile('./settings.json', 'utf8', (err, data) => {
      if (err) {
        resolve({ prefix: '/', language: 'en' }); // Default values
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Save settings to a JSON file (simulate writing settings to a file)
async function saveSettings(settings) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./settings.json', JSON.stringify(settings, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
      }
