const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('close_ticket')
    .setDescription('Acaba la conversación del ticket en el que se ejecuta el comando')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    execute(interaction) {
        if (interaction.channel.parent == '1083465280560312380') {
            interaction.reply({content: ':white_check_mark: ***COMMAND EXECUTED***', ephemeral: true});
            interaction.channel.delete();
        } else {
            interaction.reply({content: ':x: ***ESTE COMANDO NO SE PUEDE EJECUTAR EN ESTE CANAL***', ephemeral: true});
        }
    }
}