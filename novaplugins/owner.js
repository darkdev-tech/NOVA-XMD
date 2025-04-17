const { exec } = require('child_process'); // To run system commands for restart/shutdown

module.exports = {
  name: 'ownerCommands',
  description: 'Owner commands for NOVA-XMD POWERED BY DARK TECH.',
  async execute(message, client, args) {
    const command = args[0];

    // Check if the message sender is the bot owner
    const ownerID = 'YOUR_OWNER_ID'; // Replace with the owner's WhatsApp ID

    if (message.sender.id !== ownerID) {
      return message.reply('You must be the bot owner to use this command.');
    }

    // Handle different owner commands
    switch (command.toLowerCase()) {
      case 'botstatus':
        await botStatusCommand(message);
        break;

      case 'restart':
        await restartBotCommand(message);
        break;

      case 'shutdown':
        await shutdownBotCommand(message);
        break;

      case 'eval':
        await evalCommand(message, args);
        break;

      case 'getlog':
        await getBotLogCommand(message);
        break;

      default:
        message.reply('Unknown owner command. Use `botstatus`, `restart`, `shutdown`, `eval`, or `getlog`.');
    }
  }
};

// Bot status command: Returns the current status of the bot (uptime, memory usage, etc.)
async function botStatusCommand(message) {
  try {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const usedMemory = (memoryUsage.rss / 1024 / 1024).toFixed(2); // Memory usage in MB
    const totalMemory = (require('os').totalmem() / 1024 / 1024).toFixed(2); // Total memory in MB

    const statusMessage = `
      **Bot Status:**
      Uptime: ${formatUptime(uptime)}
      Memory Usage: ${usedMemory} MB / ${totalMemory} MB
    `;
    await message.reply(statusMessage);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while fetching the bot status.');
  }
}

// Format uptime to human-readable format (e.g., 1d 2h 3m 4s)
function formatUptime(uptime) {
  const days = Math.floor(uptime / (60 * 60 * 24));
  const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Restart bot command: Restarts the bot
async function restartBotCommand(message) {
  try {
    await message.reply('Restarting bot...');
    exec('pm2 restart NOVA-XMD', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting bot: ${error}`);
        message.reply('An error occurred while trying to restart the bot.');
      } else {
        console.log(stdout);
        message.reply('Bot has been restarted successfully.');
      }
    });
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to restart the bot.');
  }
}

// Shutdown bot command: Shuts down the bot
async function shutdownBotCommand(message) {
  try {
    await message.reply('Shutting down bot...');
    exec('pm2 stop NOVA-XMD', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error shutting down bot: ${error}`);
        message.reply('An error occurred while trying to shut down the bot.');
      } else {
        console.log(stdout);
        message.reply('Bot has been shut down.');
        process.exit(0); // Exits the process to stop the bot
      }
    });
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to shut down the bot.');
  }
}

// Eval command: Executes arbitrary JavaScript code (careful with this command)
async function evalCommand(message, args) {
  const code = args.slice(1).join(' ');
  if (!code) {
    return message.reply('Please provide JavaScript code to evaluate.');
  }

  try {
    const result = await eval(code);
    await message.reply(`Result: \`\`\`js\n${result}\n\`\`\``);
  } catch (error) {
    console.error(error);
    await message.reply(`Error evaluating code: \`\`\`js\n${error.message}\n\`\`\``);
  }
}

// Get bot log command: Fetches recent logs of the bot (example)
async function getBotLogCommand(message) {
  try {
    exec('tail -n 10 ./logs/bot.log', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error fetching log: ${error}`);
        message.reply('An error occurred while trying to fetch the bot log.');
      } else {
        message.reply(`**Bot Log (Last 10 Lines):**\n\`\`\`\n${stdout}\n\`\`\``);
      }
    });
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to fetch the bot log.');
  }
}
