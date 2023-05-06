const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember, Channel ],
});

client.commands = new Collection();
client.config = require('./config.json');

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});

require(`./Handlers/antiCrash`)(client);

//STATUS
client.on("ready", () => {
    client.user.setActivity('en Twitch', { type: 1, url: "https://www.twitch.tv/xtebandido" })
})

client.on("guildMemberAdd", async(member) => {
    const Discord = require('discord.js');
    const Canvas = require("canvas");
    const { registerFont } = require("canvas")
    const canvas = Canvas.createCanvas(1028, 468);
    const ctx = canvas.getContext("2d");

    registerFont("Milky-Honey.ttf", { family: "Milky Honey" })
    
    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1061773400336519179/1104203648701038643/welcome.jpg");
    ctx.drawImage(background, 0 , 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `60px Milky Honey`;
    ctx.fillText(`${member.user.username}`, 514, 400);
    ctx.textAlign = 'center';
    ctx.beginPath();
    ctx.arc(514, 161, 124, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.textAlign = 'center';
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ size: 1024, dynamic: false, extension: "jpg" }));
    ctx.drawImage(avatar, 388, 35, 250, 250);
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "./Resources/welcome.jpg");
    client.channels.cache.get("1061773400336519179").send({
        content: `:wave: **<@${member.id}> ESTAS EN LA BANDA¡** Te invito a conocer el <#1057754123342184479> y evitar inconvenientes.`, 
        files: [attachment] 
    })

})

//VOICE CHANNELS STATES
let voiceManager = new Collection();
client.on('voiceStateUpdate', async (oldState, newState) => {
    const {member, guild} = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;
    const jointocreate = voiceManager.get(member.id);
    const members = oldChannel?.members.filter((m) => !m.user.bot).map((m) => m.id)

    if ( jointocreate && oldChannel.id === jointocreate && (!newChannel || newChannel.id !== jointocreate) ) {
        if (members.length > 0) {
            let randomID = members[Math.floor(Math.random() * members.length)];
            let randomMember = guild.members.cache.get(randomID);
            randomMember.voice.setChannel(oldChannel).then((v) => {
                oldChannel.setName(`🔹┃${randomMember.user.username}`).catch((e) => null);
                oldChannel.permissionOverwrites.edit(randomMember, {
                    Connect: true,
                    ManageChannels: true,
                    MuteMembers: true,
                    KickMembers: true,
                    DeafenMembers: true,
                })
            })
            voiceManager.set(member.id, null)
            voiceManager.set(randomMember.id, oldChannel.id)
        } else {
            voiceManager.set(member.id, null)
            oldChannel.delete().catch((e) => null)
        }
    }

    if (oldChannel !== newChannel && newChannel && newChannel.id === '1083044213421264956') {
        const voiceChannel = await guild.channels.create({
            name: `🔹┃${member.user.username}`,
            type: ChannelType.GuildVoice,
            parent: newChannel.parent,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["Connect", "ManageChannels", "MuteMembers", "KickMembers", "DeafenMembers"],
                },
                {
                    id: '1099895227105427618',
                    allow: ["Connect", "ManageChannels", "MuteMembers", "KickMembers", "DeafenMembers"],
                },
                {
                    id: guild.id,
                    allow: ["Connect"],
                },
            ],
        })

        voiceManager.set(member.id, voiceChannel.id);

        await newChannel.permissionOverwrites.edit(member, {
            Connect: false
        });
        setTimeout(() => {
            newChannel.permissionOverwrites.delete(member);
        }, 3000)

        return setTimeout(() => {
            member.voice.setChannel(voiceChannel)
        }, 500)
    }

})

//INTERACTION
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        //OPEN TICKETS - @MIEMBROS @MODERADORES
        if (interaction.customId === 'createTicket') {
            let canal = interaction.guild.channels.cache.find(channel => channel.topic === `${interaction.user.id}`);

            if (canal == undefined) {
                canal = await interaction.guild.channels.create({
                    name: `📨┃${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: '1083465280560312380',
                    topic: `${interaction.user.id}`,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "SendMessages", "AttachFiles", "CreateInstantInvite"],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["ViewChannel"],
                        },
                        {
                            id: '1099895227105427618', //MOD ID ROL
                            allow: ["ViewChannel", "SendMessages", "AttachFiles", "CreateInstantInvite", "ManageChannels"],
                        },
                    ],
                })

                const embedClose = new EmbedBuilder()
                    .setAuthor({name: `¡BIENVENID@ A TU TICKET!`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                    .setDescription(`<@${interaction.user.id}>. Especifica tu problema o sugerencia y un <@&1099895227105427618> te responderá lo más pronto posible.`)
                    .setColor('#2acaea')
                    
                const buttonClose = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setLabel('Cerrar ticket')
                        .setEmoji("🗑️")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId('closeTicket')
                )
                
                canal.send({ embeds: [embedClose], components: [buttonClose]});
            }

            interaction.reply({content: `:white_check_mark: ***TU TICKET HA SIDO CREADO ***<#${canal.id}>`, ephemeral: true});
        }
        //CLOSE TICKETS - @MIEMBROS @MODERADORES
        if (interaction.customId === 'closeTicket') {
            interaction.channel.delete();
        }

        //UNMUTE/UNBAN - @MODERADORES
        if (interaction.customId.charAt(0) === 'm') {
            let avatar = await client.users.fetch(interaction.customId.slice(1));
            const user = interaction.guild.members.cache.get(interaction.customId.slice(1));
            try {
                await user.timeout(null);
            } catch {}
            const embedUNMUTE = new EmbedBuilder()
                .setDescription(`:sound: **se le elimino el SILENCIO a** <@${interaction.customId.slice(1)}>`)
                .setThumbnail(avatar.displayAvatarURL())
                .setColor('#57F287')
                .setFooter({text: `por ${interaction.user.username}`});
            
            interaction.update({ embeds: [embedUNMUTE], components: []});
        }   
        if (interaction.customId.charAt(0) === 'b') {
            try {
                await interaction.guild.members.unban(interaction.customId.slice(1));
            } catch {}

            let avatar = await client.users.fetch(interaction.customId.slice(1));

            const embedUNMUTE = new EmbedBuilder()
                .setDescription(`:green_circle: **se le elimino el BANEO a** <@${interaction.customId.slice(1)}>`)
                .setThumbnail(avatar.displayAvatarURL())
                .setColor('#57F287')
                .setFooter({text: `por ${interaction.user.username}`});
            interaction.update({ embeds: [embedUNMUTE], components: []});
        }   
    }
})