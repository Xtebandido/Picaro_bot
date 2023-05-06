const { SlashCommandBuilder, PermissionFlagsBits, Embed, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('post')
    .setDescription('Cuadro de contenido personalizado')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(
        option => option
          .setName('titulo')
          .setDescription('a repetir')
          .setRequired(true),
    )
    .addStringOption(option =>
        option
            .setName('contenido')
            .setDescription('descripcion de su contenido')
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName('color')
            .setDescription('del borde en formato HEX (#ffffff)')
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName('url')
            .setDescription('dirección url en el titulo')
    )  
    .addStringOption(option =>
        option
            .setName('miniatura')
            .setDescription('Imagen miniatura (URL)')
        )
    .addStringOption(option =>
        option
            .setName('imagen')
            .setDescription('Imagen del contenido (URL)')
        )
    .addAttachmentOption(option =>
        option
            .setName('multimedia')
            .setDescription('Archivos multimedia (documentos, imagenes, videos, audios)')
        ),    
        

    execute(interaction, client) {
        const { options } = interaction;

        const titulo = options.getString('titulo');
        const contenido = options.getString('contenido');
        const color = options.getString('color');
        const url = options.getString('url');
        const miniatura = options.getString('miniatura');
        const imagen = options.getString('imagen');
        const archivo = options.getAttachment('multimedia');

        if (color.charAt(0) != '#') {return interaction.reply({content: ':x: ***COLOR SIN FORMATO HEX***', ephemeral: true});}

        try {
            const embed = new EmbedBuilder()
                .setTitle(titulo)
                .setDescription(contenido)
                .setColor(color)
                .setURL(url)
                .setThumbnail(miniatura)
                .setImage(imagen);

            interaction.reply({content: ':white_check_mark: ***COMMAND EXECUTED***', ephemeral: true});
            
            if (archivo === null) {
                client.channels.cache.get(interaction.channelId).send({ embeds: [embed]});
            } else {
                client.channels.cache.get(interaction.channelId).send({ embeds: [embed], files: [archivo]});
            }
        } catch {
            interaction.reply({content: ':x: ***URL INVALIDO***', ephemeral: true});
        }
    }
}