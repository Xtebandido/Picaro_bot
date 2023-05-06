const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../Events/interactions/interactionCreate');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Descubre la latencia del bot'),

    execute(interaction, client) {
        interaction.reply({content: `:ping_pong: **!PONG** ***${client.ws.ping}ms***`, ephemeral: true})
    }
}