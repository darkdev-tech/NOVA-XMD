const { MessageType, GroupSettingChange } = require('@adiwajshing/baileys');

module.exports = {
  name: 'groupCommands',
  description: 'Group management commands for NOVA-XMD POWERED BY DARK TECH.',
  async execute(message, client, args) {
    const command = args[0];

    // Ensure message is from a group
    if (!message.isGroup) {
      return message.reply('This command can only be used in a group.');
    }

    // Fetch the group metadata
    const group = await message.getGroupMetadata();
    const adminList = group.participants.filter((p) => p.isAdmin);

    // Ensure the sender is an admin
    if (!adminList.some((admin) => admin.id === message.sender.id)) {
      return message.reply('You must be an admin to use this command.');
    }

    // Handle different group commands
    switch (command.toLowerCase()) {
      case 'kick':
        await kickCommand(message, client);
        break;

      case 'mute':
        await muteCommand(message, client);
        break;

      case 'unmute':
        await unmuteCommand(message, client);
        break;

      case 'setgroupname':
        await setGroupNameCommand(message, args, client);
        break;

      case 'setgroupdesc':
        await setGroupDescCommand(message, args, client);
        break;

      case 'getmembers':
        await getGroupMembersCommand(message, client);
        break;

      case 'promote':
        await promoteUserCommand(message, client);
        break;

      case 'demote':
        await demoteUserCommand(message, client);
        break;

      case 'setgroupsettings':
        await setGroupSettingsCommand(message, args, client);
        break;

      default:
        message.reply('Unknown group command. Use `kick`, `mute`, `unmute`, `setgroupname`, `setgroupdesc`, `getmembers`, `promote`, `demote`, or `setgroupsettings`.');
    }
  }
};

// Kick command: Kicks a user from the group
async function kickCommand(message, client) {
  const userToKick = message.mentions[0]; // Assuming user is mentioned
  if (!userToKick) {
    return message.reply('Please mention a user to kick.');
  }

  try {
    await client.groupRemove(message.chat.id, [userToKick.id]);
    await message.reply(`${userToKick.name} has been kicked from the group.`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to kick the user.');
  }
}

// Mute command: Mutes a user in the group
async function muteCommand(message, client) {
  const userToMute = message.mentions[0]; // Assuming user is mentioned
  if (!userToMute) {
    return message.reply('Please mention a user to mute.');
  }

  try {
    await client.groupMute(message.chat.id, userToMute.id);
    await message.reply(`${userToMute.name} has been muted.`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to mute the user.');
  }
}

// Unmute command: Unmutes a user in the group
async function unmuteCommand(message, client) {
  const userToUnmute = message.mentions[0]; // Assuming user is mentioned
  if (!userToUnmute) {
    return message.reply('Please mention a user to unmute.');
  }

  try {
    await client.groupUnmute(message.chat.id, userToUnmute.id);
    await message.reply(`${userToUnmute.name} has been unmuted.`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to unmute the user.');
  }
}

// Set group name command: Changes the group name
async function setGroupNameCommand(message, args, client) {
  const newName = args.slice(1).join(' ');
  if (!newName) {
    return message.reply('Please provide a new group name.');
  }

  try {
    await client.groupUpdateSubject(message.chat.id, newName);
    await message.reply(`The group name has been changed to: ${newName}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to change the group name.');
  }
}

// Set group description command: Changes the group description
async function setGroupDescCommand(message, args, client) {
  const newDesc = args.slice(1).join(' ');
  if (!newDesc) {
    return message.reply('Please provide a new group description.');
  }

  try {
    await client.groupUpdateDescription(message.chat.id, newDesc);
    await message.reply(`The group description has been updated to: ${newDesc}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to change the group description.');
  }
}

// Get group members command: Fetches a list of group members
async function getGroupMembersCommand(message, client) {
  try {
    const groupMetadata = await client.groupMetadata(message.chat.id);
    const memberList = groupMetadata.participants.map((p) => p.id);

    if (memberList.length === 0) {
      return message.reply('There are no members in this group.');
    }

    const memberListStr = memberList.join('\n');
    await message.reply(`Group members:\n${memberListStr}`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to fetch group members.');
  }
}

// Promote user command: Promotes a user to an admin
async function promoteUserCommand(message, client) {
  const userToPromote = message.mentions[0]; // Assuming user is mentioned
  if (!userToPromote) {
    return message.reply('Please mention a user to promote.');
  }

  try {
    await client.groupAddAdmin(message.chat.id, [userToPromote.id]);
    await message.reply(`${userToPromote.name} has been promoted to admin.`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to promote the user.');
  }
}

// Demote user command: Demotes a user from admin
async function demoteUserCommand(message, client) {
  const userToDemote = message.mentions[0]; // Assuming user is mentioned
  if (!userToDemote) {
    return message.reply('Please mention a user to demote.');
  }

  try {
    await client.groupRemoveAdmin(message.chat.id, [userToDemote.id]);
    await message.reply(`${userToDemote.name} has been demoted from admin.`);
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to demote the user.');
  }
}

// Set group settings command: Change group settings (e.g., group admins only)
async function setGroupSettingsCommand(message, args, client) {
  const setting = args[1];
  if (!setting) {
    return message.reply('Please specify a setting: `announcement`, `admins`, `everyone`');
  }

  try {
    if (setting === 'announcement') {
      await client.groupSettingUpdate(message.chat.id, GroupSettingChange.messageSend, 'announcement');
      await message.reply('Group settings changed to announcements only.');
    } else if (setting === 'admins') {
      await client.groupSettingUpdate(message.chat.id, GroupSettingChange.messageSend, 'admins');
      await message.reply('Group settings changed to admins only.');
    } else if (setting === 'everyone') {
      await client.groupSettingUpdate(message.chat.id, GroupSettingChange.messageSend, 'everyone');
      await message.reply('Group settings changed to allow everyone to send messages.');
    } else {
      return message.reply('Invalid setting. Use `announcement`, `admins`, or `everyone`.');
    }
  } catch (error) {
    console.error(error);
    await message.reply('An error occurred while trying to change group settings.');
  }
}
