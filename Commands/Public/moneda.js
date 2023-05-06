const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('moneda')
  .setDescription('Apuesta cara o sello'),

  async execute(interaction) {
    let faces = [`CARA`, `SELLO`]

    const embedPlaying = new EmbedBuilder()
     .setColor(`#ffff00`)
     .setTitle(`LANZANDO LA MONEDA :coin:`)
     .setImage(`https://www.cinepremiere.com.mx/wp-content/uploads/2020/07/Two-Face.gif`)

    const msg = await interaction.reply({ embeds: [embedPlaying] });

    const start = Date.now();
    while (Date.now() - start < 5000);
    
    const winner = faces[Math.floor(Math.random() * faces.length)];
    let img = "";

    if (winner === "CARA") {
        img = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmM0ODExYmFhYmJhODNkMGRlYjJmM2M0MzI5ZWYxNjU3MjNlNWYyZiZjdD1z/rU5AbJsldy3ndqg5LP/giphy.gif";
    } else {
        img = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Q4ZGY4MWFhY2IzZGJhYmY2ZDhhMGM3YTcyNmQxNjQ5ZDJlZjM5OSZjdD1z/oaKW9U0A3yZicWVGrQ/giphy.gif";
    }

    const embedWinner = new EmbedBuilder()
     .setColor(`#ffff00`)
     .setTitle(`:trophy: **GANÓ ${winner}**`) 
     .setImage(img)
    
    msg.edit({ embeds: [embedWinner] });
  }
}