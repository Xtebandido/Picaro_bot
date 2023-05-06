const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
        option
          .setName('usuario')
          .setDescription('a banear')
          .setRequired(true)
        )
    .addStringOption(option =>
      option
        .setName('motivo')
        .setDescription('del baneo')
        .setRequired(true)
      ),
    
    execute(interaction, client) {
      try {
      const { options } = interaction;

      const user = options.getMember('usuario');
      const motivo = options.getString('motivo');

      if (user.id === client.user.id) return interaction.reply({content: ':no_entry: ***No puedes banearme.***', ephemeral: true});
      if (user.id === interaction.user.id) return interaction.reply({content: ':no_entry: ***No puedes banearte a ti mismo.***', ephemeral: true});
      if (user.roles.cache.has('1099895227105427618')) return interaction.reply({content: ':no_entry: ***No puedes banear a otros moderadores.***', ephemeral: true});

      user.ban({deleteMessageSeconds: 1800, reason: motivo});
      
      interaction.reply(`***<@${user.id}> HA SIDO BANEADO!*** :red_circle:`);

      const button = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId(`b${user.id}`)
          .setLabel('UNBAN')
          .setStyle(ButtonStyle.Primary)
      )
      const embedBAN = new EmbedBuilder()
        .setDescription(`<@${user.id}> **ha sido BANEADO!** :red_circle:`)
        .setThumbnail(user.displayAvatarURL())
        .setColor('#ff0000')
        .addFields({name: 'MOTIVO', value: `${motivo}`, inline: true})
        .setFooter({text: `por ${interaction.user.username}`});
      
      const channel = client.channels.cache.get('1058381894682681445');
      channel.send({embeds: [embedBAN], components: [button]});
      } catch {interaction.reply({content: ':warning: ***Tal vez este usuario ya fue expulsado o baneado.***', ephemeral: true})}
    }
}