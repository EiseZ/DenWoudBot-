const Discord = require('discord.js');
const Gamedig = require('gamedig');
const { send } = require('process');
const client = new Discord.Client();

var prefix = '!';
const noPermMsg = 'Je hebt geen toestemming om dit te doen. Maak een ticket aan als je denkt dat dit een fout is.';
const adminChannelId = '773457906435096616';
const welkomChannelId = '772596676853891083';
const regelsChannelId = '772267624363982848';
const playercountChannelId = '778972915672547348';
const verifiedRoleId = '772267319023370260';

const pfPic = 'https://cdn.discordapp.com/attachments/772502958063353876/777549213462298644/DENWOUD_LOGO_Nieuw_geen_vlag.png';

const stickeyMessages = [];

client.commands = new Discord.Collection();

client.login('NzczMTI1ODgyMzQ4MTc1Mzcx.X6Erlg.Z7LDvxZ8sbF4i6ReBD5X7B4pynY');

client.once('ready', () => {
    console.log('DenWoud Bot is online!');
    var server = client.guilds.cache.get('772266910372462592');
    server.channels.cache.get('772267624363982848').messages.fetch();
    client.user.setActivity('DenWoudRP', { type: 'PLAYING' });
});

client.on('guildMemberAdd', member => {
    console.log('new guild member');

    let welkomChannel = client.channels.cache.get(welkomChannelId);
    var regelsChannel = client.channels.cache.get(regelsChannelId);

    var embed = new Discord.MessageEmbed()
    .setAuthor('DenWoud', pfPic)
    .setColor('#005da4')
    .setTitle('Welkom')
    .addField(`Hallo ${member.displayName}!`, 'Welkom op de officiele discord server van DenWoud!')
    .addField('Verify', `Ga naar ${regelsChannel} om je te verifiëren om toegang te krijgen tot de server.`)
    .setFooter('Doe !commands om alle commands van de server te zien.');
    welkomChannel.send(embed)
});

client.on('message', async message => {
    if(message.author.bot) return;

    var toDelete = [];
    stickeyMessages.forEach(function(stickeyMessage, index) {
        if(stickeyMessage.channel == message.channel){
            var msgToDelete = stickeyMessage.channel.messages.cache.get(stickeyMessage.msg.id);
            msgToDelete.delete();

            stickeyMessage.channel.send(stickeyMessage.msg.content);

            setTimeout(pushToStickeys, 100, stickeyMessage.channel);
            toDelete.push(index);
        }
    });
    toDelete.forEach(toDelete => {
        stickeyMessages.splice(toDelete, 1);
    });
    toDelete = [];

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const channel = message.channel;
    const sender = message.member; 

    switch (command) {
        /*
        --- Normale commands ---
        */

        case 'commands':
        case 'c':
        case 'com':
        case 'comm':
        case 'comms':
            var embed = new Discord.MessageEmbed()
            .setAuthor('DenWoud', pfPic)
            .setColor('#005da4')
            .setTitle('Commands')
            .setDescription('Prefix: ' + prefix)
            .addField('Info', `Info over de server. Doe: ${prefix}info`)
            .addField('Bot info', `Info over de bot. Doe ${prefix}botinfo`)
            .addField('Warnadmin', `Is er iemand die de regels overtreed? Doe: ${prefix}warnadmin (@persoon) {reden}`)
            .setFooter('Zoek je naar de mod commands? Doe !modcommands');
            channel.send(embed)
            break;
        
        case 'info':
        case 'i':
        case 'inf':
        case 'information':
        case 'informatie':
            var embed = new Discord.MessageEmbed()
            .setAuthor('DenWoud', pfPic)
            .setColor('#005da4')
            .setTitle('Server Info')
            .addField('DenWoud', 'DenWoud is leuke GTA 5 server .....blablabla...')
            .setFooter('Zoek je naar info over de bot? Doe !botinfo');
            channel.send(embed)
            break;
        
        case 'botinfo':
        case 'binfo':
        case 'boti':
        case 'bi':
        case 'botinf':
        case 'botinformation':
        case 'binformation':
        case 'botinformatie':
        case 'binformatie':
            var embed = new Discord.MessageEmbed()
            .setAuthor('DenWoud', pfPic)
            .setColor('#005da4')
            .setTitle('Bot Info')
            .addField('Maker', 'EiscoMania')
            .addField('Version', '0.0.1')
            .setFooter('Zoek je naar info over de server? Doe !info');
            channel.send(embed)
            break;
        case 'warnadmin':
        case 'wa':
        case 'wadmin':
        case 'warma':
            let memberWarnTarget = message.mentions.members.first();
            let memberWarnReason = args.slice(1).join(' ');

            if (!memberWarnTarget) {
                channel.send('Geef een persoon op om te waarschuwen.')
                return;
            }

            let adminChannel = message.guild.channels.cache.get(adminChannelId);

            adminChannel.send(`${message.member.user} heeft jullie een waarschuwing gegeven over ${memberWarnTarget}. Reden: ${memberWarnReason || 'Geen reden opgegeven.'}`);
            break;
        
        /*
        --- Mod commands ---
        */

        case 'modcommands':
        case 'modc':
        case 'mc':
        case 'modcom':
        case 'mcom':
        case 'modcomm':
        case 'mcomm':
        case 'modcomms':
        case 'mcomms': 
            var embed = new Discord.MessageEmbed()
            .setAuthor('DenWoud', pfPic)
            .setColor('#005da4')
            .setTitle('Mod commands')
            .addField('Ban', `Hiermee kan je iemand bannen. Doe: ${prefix}ban (@persoon) {reden}`)
            .addField('Kick', `Hiermee kan je iemand kicken. Doe: ${prefix}kick (@persoon) {reden}`)
            .addField('Mute', `Hiermee kan je iemand muten. Doe: ${prefix}mute (@persoon)`)
            .addField('Unmute', `Hiermee kan je iemand unmuten. Doe: ${prefix}ban (@persoon)`)
            .addField('Setup verification role', `Hiermee stuurt de bot het verification bericht. Doe: ${prefix}setupverificationrole`)
            .addField('Prefix', `Hiermee verander je de prefix van de bot. Doe: ${prefix}prefix (prefix)`)
            .addField('Send', `Hiermee laat je de bot een bericht sturen. Doe: ${prefix}send (chat)`)
            .setFooter('Zoek je naar normale commands? Doe !commands');
            channel.send(embed)
            break;

        case 'ban':
            if(!sender.hasPermission('BAN_MEMBERS')){
                channel.send(noPermMsg);
                return;
            };
            
            let banTarget = message.mentions.members.first();
            let banReason = args.slice(1).join(' ');

            if(!banTarget) {
                channel.send('Geef astublieft een persoon op.');
                return;
            }

            try {
                banTarget.ban(banReason);
                channel.send('De persoon is gebanned.');
            } catch(e) {
                channel.send('Kon de persoon niet bannen: ' + e);
                return;
            }

            try {
                banTarget.send(`Je bent gebanned van \`${message.guild.name}\`.\n**Reden:** ${banReason || "Geen reden gegeven."}`);
            } catch(e) {
                channel.send("Warning: Ik kan deze persoon niet informeren over zijn ban via DM's. Hij/zij heeft waarschijnlijk zijn/haar berichten uit staan.");
            }
            break;
        case 'kick':
            if(!sender.hasPermission('KICK_MEMBERS')){
                channel.send(noPermMsg);
                return;
            };

            let kickTarget = message.mentions.members.first();
            let kickReason = args.slice(1).join(' ');

            if(!kickTarget) {
                channel.send('Geef astublieft een persoon op.');
                return;
            }

            try {
                kickTarget.kick(kickReason);
                channel.send('De persoon is gekicked.');
            } catch(e) {
                channel.send('Kon de persoon niet kicken: ' + e);
                return;
            }

            try {
                kickTarget.send(`Je bent gekicked van \`${message.guild.name}\`.\n**Reden:** ${kickReason || "Geen reden gegeven."}`);
            } catch(e) {
                channel.send("Warning: Ik kan deze persoon niet informeren over zijn kick via DM's. Hij/zij heeft waarschijnlijk zijn/haar berichten uit staan.");
            }
            break;
        case 'mute':
            if(!sender.hasPermission('KICK_MEMBERS')){
                channel.send(noPermMsg);
                return;
            };
            
            let muteTarget = message.mentions.members.first();
            
            if(!muteTarget) {
                channel.send('Geef astublieft een persoon op.');
                return;
            }

            var mutedRole = channel.guild.roles.cache.find(r => r.name === 'Muted');

            muteTarget.roles.add(mutedRole);

            channel.send('De persoon is gemute.');
            break;
        case 'unmute':
            if(!sender.hasPermission('KICK_MEMBERS')){
                channel.send(noPermMsg);
                return;
            };

            let unmuteTaget = message.mentions.members.first();

            if(!unmuteTaget) {
                channel.send('Geef astublieft een persoon op.');
                return;
            }

            var mutedRole = channel.guild.roles.cache.find(r => r.name === 'Muted');

            if(!unmuteTaget.roles.cache.find(r => r.name === "Muted")) {
                channel.send('Deze persoon in niet gemute.');
                return;
            }

            unmuteTaget.roles.remove(mutedRole);

            channel.send('De persoon is geunmute.');
            break;
        case 'setupverificationrole':
            if(!sender.hasPermission('ADMINISTRATOR')){
                channel.send(noPermMsg);
                return;
            };    

            let regelsChannel = client.channels.cache.get(regelsChannelId);

            var embed = new Discord.MessageEmbed()
            .setAuthor('DenWoud', pfPic)
            .setColor('#005da4')
            .setTitle('Verify')
            .setDescription('Klik hieronder op het vinkje om je te verifiëren.');

            regelsChannel.send(embed).then(sentEmbed => {
                sentEmbed.react("✅")
            });

            channel.send('De verification role is gemaakt.')
            break;
        case 'prefix':
            if(!sender.hasPermission('ADMINISTRATOR')){
                channel.send(noPermMsg);
                return;
            };    

            if(args[0]){
                prefix = args[0];
                channel.send(`De prefix is veranderd naar ${prefix}.`);
            } else {
                channel.send('Geef een prefix op om in te stellen.');
            }
            
            break;
        case 'send':
            if(!sender.hasPermission('ADMINISTRATOR')){
                channel.send(noPermMsg);
                return;
            };

            if(!args[0]){
                channel.send('Geef een kanaal op om het bericht naartoe te sturen.');
                return;
            }

            var channelToSend = message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''));

            let commandSender = message.member;

            channel.send(`Stuur nu het bericht om te versturen naar ${channelToSend}.`);

            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
            collector.on('collect', message => {
                console.log('collect');
                if (message.member == commandSender) {
                    channelToSend.send(message);
                    message.channel.send('Het bericht is verstuurd.');
                    collector.stop();
                    return;
                }
            })
            break;
        case 'sendstickey':
            if(!sender.hasPermission('ADMINISTRATOR')){
                channel.send(noPermMsg);
                return;
            };
            
            if(!args[0]){
                channel.send('Geef een kanaal op om het bericht naartoe te sturen.');
                return;
            }

            var channelToSendStickey = message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''));
            
            let commandSenderStickey = message.member;
    
            channel.send(`Stuur nu het bericht om te versturen naar ${channelToSendStickey}.`);
    
            const collectorStickey = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
            collectorStickey.on('collect', messageToSend => {
                if (messageToSend.member == commandSenderStickey) {
                    channelToSendStickey.send(messageToSend);
                    message.channel.send('Het bericht is verstuurd.');

                    setTimeout(pushToStickeys, 100, channelToSendStickey);
                    collectorStickey.stop();
                    return;
                }
            });
            break;
    }
});

function pushToStickeys(channelToSendStickey) {
    channelToSendStickey.messages.fetch({ limit: 20 }).then(messages => {
        console.log(messages);
        var sendMessage;
        messages.forEach(message => {
            if(message.author == client.user) {
                sendMessage = message;
            }
        });
        var newStickeyMsg = {channel:channelToSendStickey, msg:sendMessage};
        stickeyMessages.push(newStickeyMsg);
    });
};


client.on('messageReactionAdd', async (reaction, user) => {
    if(!reaction.emoji.name === "✅") return;
    if(!reaction.message.channel.id == "772267624363982848") return;

    reaction.message.guild.member(user).roles.add(verifiedRoleId);
});

var myVar = setInterval(myTimer, 20000);
    function myTimer() {
        Gamedig.query({
            type: 'fivem',
            host: '194.36.102.12' //IP
        }).then((state) => {
            console.log(state);
        
            var serverPlayers = state.players;
            var serverPlayercount = serverPlayers.length;
            
            console.log('Spelers Online ' + serverPlayercount);
            
            var server = client.guilds.cache.get('772266910372462592');
            playercountChannel = server.channels.cache.get(playercountChannelId)
            playercountChannel.setName('Spelers online: ' + serverPlayercount);
        }).catch((error) => {
            console.log("Server is offline");
            var server = client.guilds.cache.get('772266910372462592');
            playercountChannel = server.channels.cache.get(playercountChannelId)
            playercountChannel.setName('Spelers online: 0');
     });
} 