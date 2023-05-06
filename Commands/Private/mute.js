const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Silencia a un usuario')
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption(option =>
        option
          .setName('usuario')
          .setDescription('a silenciar')
          .setRequired(true)
        )
      .addStringOption(option =>
        option
          .setName('motivo')
          .setDescription('del silencio')
          .setRequired(true)
        )
    .addIntegerOption(option =>
        option
          .setName('duracion')
          .setDescription('del silencio en MINUTOS')
          .setRequired(true)
        ),
    
    
    execute(interaction, client) {
      const { options } = interaction;

      const user = options.getMember('usuario');
      const motivo = options.getString('motivo');
      const duracion = options.getInteger('duracion');

      if (duracion > 43800) return interaction.reply({content: ':warning: ***El limite de duración es de 1 mes (43.800 minutos).***', ephemeral: true});
      if (user.id === client.user.id) return interaction.reply({content: ':no_entry: ***No puedes silenciarme.***', ephemeral: true});
      if (user.id === interaction.user.id) return interaction.reply({content: ':no_entry: ***No puedes silenciarte a ti mismo.***', ephemeral: true});
      if (user.roles.cache.has('1099895227105427618')) return interaction.reply({content: ':no_entry: ***No puedes silenciar a otros moderadores.***', ephemeral: true});

      user.timeout(duracion * 60 * 1000, motivo);

      interaction.reply(`***<@${user.id}> HA SIDO SILENCIADO!*** :mute:`);

      const button = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId(`m${user.id}`)
          .setLabel('UNMUTE')
          .setStyle(ButtonStyle.Primary)
      )
      const embedMUTE = new EmbedBuilder()
        .setDescription(`<@${user.id}> **ha sido SILENCIADO!** :mute:`)
        .setThumbnail(user.displayAvatarURL())
        .setColor('#9B59B6')
        .addFields(
          {name: 'MOTIVO', value: `${motivo}`, inline: true},
          {name: 'DURACION', value: `${duracion} minutos`, inline: true})
        .setFooter({text: `por ${interaction.user.username}`});
      
      const channel = client.channels.cache.get('1058381894682681445');
      channel.send({embeds: [embedMUTE], components: [button]});

    }
}