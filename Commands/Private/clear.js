const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription("Eliminar cierta cantidad de mensajes de un canal o de un miembro")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addIntegerOption(option =>
        option.setName('cantidad')
        .setDescription("de mensajes a eliminar (max: 99)")
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('miembro')
        .setDescription('a quien se le eliminara los mensajes')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const cantidad = options.getInteger('cantidad');
        const miembro = options.getUser('miembro');

        if (cantidad <= 0 || cantidad >= 100) {return interaction.reply(":x: **NUMERO INVALIDO. (LIMITE DE 99 MENSAJES)**")}

        const messages = await channel.messages.fetch({
            limit: cantidad+1,
        })

        const embed = new EmbedBuilder()
            .setColor("#00FF00")

        if(miembro) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === miembro.id && cantidad > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                embed.setDescription(`**SE ELIMINARON CORRECTAMENTE** ${messages.size} **MENSAJES DE** ${miembro}**.**`);
                interaction.reply({embeds: [embed]});
            });
        } else {
            await channel.bulkDelete(cantidad, true).then(messages => {
                embed.setDescription(`**SE ELIMINARON CORRECTAMENTE** ${messages.size} **MENSAJES DEL CANAL.**`);
                interaction.reply({embeds: [embed]});
            });
        }

    }
}