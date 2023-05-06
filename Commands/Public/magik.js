const { SlashCommandBuilder, Embed, EmbedBuilder  } = require('discord.js');
var request = require("request");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('magik')
    .setDescription('Distorsiona una imagen.')
    .addUserOption(option =>
        option
            .setName('usuario')
            .setDescription('a distorsionar')
        )
    .addAttachmentOption(option =>
        option
            .setName('imagen')
            .setDescription('a distorsionar')
        )
    .addStringOption(option =>
        option
            .setName('url')
            .setDescription('a distorsionar')
        ),

    async execute(interaction, client) {
        const { options } = interaction;
        await interaction.deferReply({ephemeral: true});

        const usuario = options.getMember('usuario');
        const image = options.getAttachment('imagen');
        const link = options.getString('url');

        let title = ["", "", ""]
        let status = ["", "", ""]

        if (usuario != null) {
            title[0] = "AVATAR: ";
            status[0] = "⌛ㅤ";
            request(`https://nekobot.xyz/api/imagegen?type=magik&image=${usuario.user.displayAvatarURL({ extension: "png", forceStatic: true, size: 512 })}&intensity=${Math.ceil(Math.random() * 10)}`, function (error, response, body) {
                if (error || !body || !JSON.parse(body).success) {
                    status[0] = "❌ㅤ";
                    return interaction.editReply({
                        embeds: [new EmbedBuilder()
                            .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                        ], ephemeral: true
                    });
                }
    
                client.channels.cache.get(interaction.channelId).send({
                    embeds: [new EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
                        .setImage(JSON.parse(body).message)]
                })

                status[0] = ":white_check_mark:ㅤ";

                interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                    ], ephemeral: true
                });
            })
        }

        if (image != null) {
            title[1] = "IMAGE: ";
            status[1] = "⌛ㅤ";
            request(`https://nekobot.xyz/api/imagegen?type=magik&image=${image.proxyURL}&intensity=${Math.ceil(Math.random() * 10)}`, function (error, response, body) {
                if (error || !body || !JSON.parse(body).success) {
                    status[1] = "❌ㅤ";
                    return interaction.editReply({
                        embeds: [new EmbedBuilder()
                            .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                        ], ephemeral: true
                    });
                }
    
                client.channels.cache.get(interaction.channelId).send({
                    embeds: [new EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
                        .setImage(JSON.parse(body).message)]
                })

                status[1] = ":white_check_mark:ㅤ";

                interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                    ], ephemeral: true
                });
            })
        }

        if (link != null) {
            title[2] = "URL: ";
            status[2] = "⌛";
            request(`https://nekobot.xyz/api/imagegen?type=magik&image=${link}&intensity=${Math.ceil(Math.random() * 10)}`, function (error, response, body) {
                if (error || !body || !JSON.parse(body).success) {
                    status[2] = "❌";
                    return interaction.editReply({
                        embeds: [new EmbedBuilder()
                            .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                        ], ephemeral: true
                    });
                }
    
                client.channels.cache.get(interaction.channelId).send({
                    embeds: [new EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
                        .setImage(JSON.parse(body).message)]
                })

                status[2] = ":white_check_mark:";

                interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                    ], ephemeral: true
                });
            })
        }

        if (usuario == null && image == null && link == null) {
            interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ ELIGE AL MENOS UNA OPCIÓN")
                    .setColor("Red")], ephemeral: true
                })
        } else {
            interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setDescription("**" + title[0] + status[0] + title[1] + status[1] +title[2] + status[2] + "**")
                ], ephemeral: true
            })
        }
    }
}