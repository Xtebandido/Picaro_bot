const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Activar canal a los miembros')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
    execute(interaction) {
        const {guild, channel} = interaction;

        const embed = new EmbedBuilder()
        .setTitle(`🔓 ESTE CANAL HA SIDO REACTIVADO.`)
        .setColor('#00FF00')

        channel.permissionOverwrites.edit(guild.id, {SendMessages: null,})

        interaction.reply({embeds: [embed]})

    }
}