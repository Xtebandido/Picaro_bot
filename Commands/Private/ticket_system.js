const { SlashCommandBuilder, PermissionFlagsBits, Embed, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tickets')
    .setDescription('Crear sistema de tickets')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle('SERVICIO DE AYUDA')
        .setThumbnail('https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58169/admission-tickets-emoji-clipart-md.png')
        .setColor('#2acaea')
        .setDescription("Bienvenid@ al sistema de tickets. Para cualquier inquietud, duda, solicitud, sugerencia, consulta o reporte abrá un ticket y deja escrita tu petición para responder con más facilidad.")
        
        const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId('createTicket')
              .setLabel('Abrir ticket')
              .setEmoji("📨")
              .setStyle(ButtonStyle.Primary),
          )

        interaction.reply({content: ':white_check_mark: ***COMMAND EXECUTED***', ephemeral: true});
        client.channels.cache.get('1064016002096042035').send({ embeds: [embed], components: [button]});
    }
}