const { SlashCommandBuilder, PermissionFlagsBits, Embed, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Cartel con las reglas')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle('NORMAS')
        .setURL('https://discord.com/guidelines')
        .setThumbnail('https://cdn-icons-png.flaticon.com/512/760/760172.png')
        .setColor('ff0000')
        .addFields(
            {
                name: '𝟙 ⋅ RESPETO A TODOS',
                value: '\u200b',
            },
            {
                name: `𝟚 ⋅ NO SE PERMITE EL FLOOD Y EL SPAM`,
                value: '\u200b'
            },
            {
                name: `𝟛 ⋅ NO PROMOVER EL ODIO, LA VIOLENCIA O EL ACOSO`,
                value: '\u200b'
            },
            {
                name: `𝟜 ⋅ NO SE PERMITE CONTENIDO DELICADO (+18/NSFW/GORE)`,
                value: '\u200b'
            },
            {
                name: `𝟝 ⋅ NO SE PERMITE COMPARTIR INFORMACION PERSONAL DE LOS USUARIOS`,
                value: '\u200b'
            },
            {
                name: `\u200b`,
                value: '[TÉRMINOS DE SERVICIO](https://discord.com/terms)'
            },
            {
                name: `\u200b`,
                value: 'Si necesitas ayuda, tienes alguna duda o sugerencia te invitamos a abrir un ticket en <#1064016002096042035>. No se te olvide seguirme en redes sociales:'
            }
        )
        
        const button_redes = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setLabel('YOUTUBE')
              .setEmoji("<:youtube:1083411748943581234>")
              .setStyle(ButtonStyle.Link)
              .setURL("https://www.youtube.com/@xtebandido"),
            new ButtonBuilder()
              .setLabel('INSTAGRAM')
              .setEmoji("<:instagram:1083425605615362158>")
              .setStyle(ButtonStyle.Link)
              .setURL("https://www.instagram.com/xtebandid0"),
            new ButtonBuilder()
              .setLabel('TWITCH')
              .setEmoji("<:twitch:1083425564506988595>")
              .setStyle(ButtonStyle.Link)
              .setURL("https://www.twitch.tv/xtebandido"),
            new ButtonBuilder()
              .setLabel('TWITTER')
              .setEmoji("<:twitter:1083425550141501471>")
              .setStyle(ButtonStyle.Link)
              .setURL("https://www.twitter.com/xtebandid0"),
            new ButtonBuilder()
              .setLabel('TIKTOK')
              .setEmoji("<:tiktok:1083425589685399582>")
              .setStyle(ButtonStyle.Link)
              .setURL("https://www.tiktok.com/@xtebandido"),
          )

        interaction.reply({content: ':white_check_mark: ***COMMAND EXECUTED***', ephemeral: true});
        client.channels.cache.get(interaction.channelId).send({ embeds: [embed], components: [button_redes]});
    }
}