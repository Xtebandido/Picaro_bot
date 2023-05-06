const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa a un usuario')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
        option
          .setName('usuario')
          .setDescription('a expulsar')
          .setRequired(true)
        )
      .addStringOption(option =>
        option
          .setName('motivo')
          .setDescription('del expulsión')
          .setRequired(true)
        ),
    
    execute(interaction, client) {
      try {
      const { options } = interaction;
      const user = options.getMember('usuario');
      const motivo = options.getString('motivo');

      if (user.id === client.user.id) return interaction.reply({content: ':no_entry: ***No puedes expulsarme.***', ephemeral: true});
      if (user.id === interaction.user.id) return interaction.reply({content: ':no_entry: ***No puedes expulsarte a ti mismo.***', ephemeral: true});
      if (user.roles.cache.has('1099895227105427618')) return interaction.reply({content: ':no_entry: ***No puedes expulsar a otros moderadores.***', ephemeral: true});

      user.kick(motivo);
      
      interaction.reply(`***<@${user.id}> HA SIDO EXPULSADO!*** :orange_circle:`);

      const embedBAN = new EmbedBuilder()
        .setDescription(`<@${user.id}> **ha sido EXPULSADO!** :orange_circle:`)
        .setThumbnail(user.displayAvatarURL())
        .setColor('#f4a261')
        .addFields({name: 'MOTIVO', value: `${motivo}`, inline: true})
        .setFooter({text: `por ${interaction.user.username}`});
      
      const channel = client.channels.cache.get('1058381894682681445');
      channel.send({embeds: [embedBAN]});
    } catch {interaction.reply({content: ':warning: ***Tal vez este usuario ya fue expulsado o baneado.***', ephemeral: true})}
    }
}