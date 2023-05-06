const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Repite lo que escribas')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>
        option
          .setName('mensaje')
          .setDescription('a repetir')
          .setRequired(true)
        ),
    
    execute(interaction, client) {
        const { options } = interaction;
        interaction.reply({content: ':white_check_mark: ***COMMAND EXECUTED***', ephemeral: true});
        client.channels.cache.get(interaction.channelId).send(options.getString('mensaje'));
    }
}