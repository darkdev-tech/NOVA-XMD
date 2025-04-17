const { prefix, botName } = require('../config'); // Adjust path if needed

module.exports = {
  name: 'menu',
  alias: ['help'],
  category: 'general',
  desc: 'Show full command list',
  usage: `${prefix}menu`,
  async exec(m, sock) {
    const menuText = `
╭━━━〔 ${botName || 'NOVA XMD BOT'} MENU 〕━━━╮
┃
┃ 👑 *OWNER COMMANDS*
┃ ┣ ${prefix}owner
┃ ┣ ${prefix}shutdown
┃ ┣ ${prefix}restart
┃ ┣ ${prefix}setprefix <symbol>
┃ ┣ ${prefix}block <user>
┃ ┣ ${prefix}unblock <user>
┃ ┣ ${prefix}uptime
┃ ┣ ${prefix}broadcast <text>
┃ ┣ ${prefix}mode [public/private/self]
┃ ┣ ${prefix}setpp
┃ ┣ ${prefix}join <group link>
┃ ┗ ${prefix}leavegc
┃
┃ 🛡️ *GROUP COMMANDS*
┃ ┣ ${prefix}kick @user
┃ ┣ ${prefix}add <number>
┃ ┣ ${prefix}promote @user
┃ ┣ ${prefix}demote @user
┃ ┣ ${prefix}mute
┃ ┣ ${prefix}unmute
┃ ┣ ${prefix}group [open/close]
┃ ┣ ${prefix}tagall
┃ ┣ ${prefix}setwelcome <msg>
┃ ┣ ${prefix}setgoodbye <msg>
┃ ┣ ${prefix}delwelcome
┃ ┣ ${prefix}delgoodbye
┃ ┗ ${prefix}antilink [on/off]
┃
┃ ⚙️ *SETTINGS*
┃ ┣ ${prefix}prefix <symbol>
┃ ┣ ${prefix}welcome [on/off]
┃ ┣ ${prefix}goodbye [on/off]
┃ ┣ ${prefix}xp [on/off]
┃ ┣ ${prefix}cooldown <sec>
┃ ┣ ${prefix}lang <code>
┃ ┣ ${prefix}autorespond [on/off]
┃ ┣ ${prefix}log [on/off]
┃ ┗ ${prefix}resetsettings
┃
┃ 🔍 *SEARCH*
┃ ┣ ${prefix}google <query>
┃ ┣ ${prefix}image <query>
┃ ┣ ${prefix}yt <query>
┃ ┣ ${prefix}lyrics <song>
┃ ┣ ${prefix}weather <city>
┃ ┣ ${prefix}define <word>
┃ ┣ ${prefix}news <topic>
┃ ┗ ${prefix}translate <text>
┃
┃ 🎮 *FUN*
┃ ┣ ${prefix}joke
┃ ┣ ${prefix}meme
┃ ┣ ${prefix}quote
┃ ┣ ${prefix}flip
┃ ┣ ${prefix}roll
┃ ┣ ${prefix}8ball <q>
┃ ┣ ${prefix}riddle
┃ ┣ ${prefix}love <name1> <name2>
┃ ┣ ${prefix}cat
┃ ┣ ${prefix}dog
┃ ┗ ${prefix}fact
┃
┃ ℹ️ *SYSTEM*
┃ ┣ ${prefix}menu
┃ ┣ ${prefix}ping
┃ ┣ ${prefix}about
┃ ┣ ${prefix}help
┃ ┣ ${prefix}stats
┃ ┣ ${prefix}invite
┃ ┗ ${prefix}feedback <msg>
┃
╰━━━〔 POWERED BY DARK_TECH 〕━━━╯
    `;
    await sock.sendMessage(m.chat, { text: menuText }, { quoted: m });
  },
};
