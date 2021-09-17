const Discord = require("discord.js")
// const luxon = require("luxon.js")

const cfg = require("./config/config.json")
const sentence = require("./config/sentence.json")
const eden = require("./config/eden.json")
const color = require("./config/color.json")
const myEmbed = require("./module/daily.js")

const bot = new Discord.Client()
const url = cfg.host

bot.on('ready', () => {
  console.log(`Le bot \x1b[33m${bot.user.tag}\x1b[0m est \x1b[32men ligne\x1b[0m !`)
})

// bot.login(cfg.token)
// "token": "ODYyMDAxODQ2NTExMDc1MzM4.YOR_xw._8p_SBTrUc8fGyyrZYqeF3VZ0YI" // NORMAL
bot.login("ODg1NjA4MDY4NTE4Mzk2MDA0.YTpgyQ.kg01YX8DdUTRTjHbGzujgpN6AbY") // TEST

// CALCUL DU JOUR & RESET 18h
const currentDate = new Date()
let thisMonth = currentDate.getMonth() + 1
let thisDate = currentDate.getDate()
let thisDay = currentDate.getDay()
let thisHour = currentDate.getHours()
const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
const monthOfYear = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

// let edenDay, postDay = thisDay
function reset() {
  // RESET 17h
  if ( thisHour > 16 ) { edenDay = thisDay + 1 }
  else edenDay = thisDay
  // RESET 18h
  if ( thisHour > 17 ) { postDay = thisDay + 1 }
  else postDay = thisDay
  // RESET WEEK
  if ( thisDay = 1 && thisHour > 17 ) { thisWeek = thisDay + 1 }
  else thisWeek = thisDay
}

bot.on('message', message => {
  reset()
  // AIDE & SUPPORT
  if (message.content === cfg.prefix + '?') { message.author.send(sentence.help) }
  if (message.content === cfg.prefix + 'iki') { message.author.send(url + cfg.gwiki) }
  if (message.content === cfg.prefix + 'eb') { message.author.send(url + cfg.gweb) }
  if (message.content === cfg.prefix + 'u') { message.author.send(sentence.updates + url + cfg.updates.URI) }
  if (message.content === cfg.prefix + 'v') { message.author.send("v**" + cfg.version + '** © ' + cfg.author + ' ' + cfg.smiley) }
  // EVENEMENTS
  if (message.content === cfg.prefix + '!') { 
    // avec le mois, date et heure => chercher l'info dans envent.json
    // message.author.send(event[mois].[jour].name)
  }
  // ZAISHEN
  if (message.content === cfg.prefix + 'z') { message.author.send("") }
  if (message.content === cfg.prefix + 'cz') { message.author.send("") }
  if (message.content === cfg.prefix + 'mz') { message.author.send("") }
  if (message.content === cfg.prefix + 'pz') { message.author.send("") }
  if (message.content === cfg.prefix + 'zv') { message.author.send("") }
  // EDEN
  if (message.content === cfg.prefix + 'e') { message.author.send({
    embed: {
      color: color.green,
      title: "eden",
      url: url+eden.URImiss,
      description: "description",
      image: eden.picMiss,
      fields: [
        { name: "field name", value: "eden" },
        { name: "mission", value: "edenMiss" }
      ],
      footer: { icon_url: bot.user.displayAvatarURL(), text: "Actualisation à " + eden.updatime + "h" }
  } }) }
  // EDEN MISSION
  if (message.content === cfg.prefix + 'em') {
    const edenMission = new Discord.MessageEmbed()
    .setTitle(eden.weekdays[edenDay].name)
    .setColor(color.dark_green)
    .setDescription(eden.weekdays[edenDay].objectif)
    .setImage(eden.weekdays[edenDay].map)
    .setThumbnail(eden.picMiss)
    .setURL(url + eden.weekdays[edenDay].URI)
    .addFields({ name: "Requis", value: eden.required })
    .addFields({ name: "Récompenses", value: eden.reward, inline: true })
    .setFooter( "Actualisation à " + eden.updatime + "h", bot.user.displayAvatarURL() )
    message.author.send(edenMission)
  }
  // EDEN NICHOLAS
  if (message.content === cfg.prefix + 'en') {
    const edenNico = new Discord.MessageEmbed()
    .setTitle(eden.nameNic)
    .setColor(color.light_green)
    .setDescription("Aujourd'hui Nicholas Sandford collectionne ")
    .setImage(eden.locNic)
    .setThumbnail(eden.picNic)
    .setURL(url + eden.URInic)
    .addFields({ name: "En échange de", value: eden.gift })
    .setFooter( "Actualisation à " + eden.updatime + "h", bot.user.displayAvatarURL() )
    message.author.send(edenNico)
  }
  // TODAY
  if (message.content === cfg.prefix + 'j') { message.author.send({
    embed: {
      color: 3447003,
      title: "Cette semaine",
      url: url + cfg.dailyActivities.URI,
      fields: [
        { name: "Nicholas Sandford ```/gwen```", value: "edenNico" },
        { name: "Avant-garde d'Ascalon ```/gwem```", value: "[" + eden.weekdays[edenDay].name + "](" + url + eden.weekdays[edenDay].URI + ")" },
        { name: "Mission zaishen ```/gwmz```", value: "zMission" },
        { name: "Vainqueur zaishen ```/gwvz```", value: "zVainqueur" },
        { name: "Prime zaishen ```/gwpz```", value: "zPrime" },
        { name: "Combat zaishen ```/gwcz```", value: "zCombat" },
        { name: "Avis de recherche ```/gww```", value: "avisRecherche" },
        { name: "Bonus hebdomadaire ```/gwh```", value: "bonusHebdo" }
      ],
      timestamp: "Actualisation à 18h",
      footer: { icon_url: bot.user.displayAvatarURL(), text: "Mis à jour à 18h, amuse-toi bien !" }
  }})}
  // SEMAINE
  if (message.content === cfg.prefix + 'h') {
    const thisWeek = new Discord.MessageEmbed()
    .setTitle("This is your title, it can hold 256 characters")
    .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
    .setColor(0x00AE86)
    .setDescription("This is the main body of text, it can hold 2048 characters.")
    .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
    .setImage("https://www.no-cookie.com/w/images/f/fa/Sauvetage_de_l%27Avant-garde_-_fantassin_Tate-carte.jpg")
    .setThumbnail("http://i.imgur.com/p2qNFag.png")
    .setTimestamp()
    .setURL("https://discord.js.org/#/docs/main/v12/class/MessageEmbed")
    .addFields({ name: "This is a field title, it can hold 256 characters",
        value: "This is a field value, it can hold 1024 characters."})
    .addFields({ name: "Inline Field", value: "They can also be inline.", inline: true })
    .addFields({ name: '\u200b', value: '\u200b' })
    .addFields({ name: "Inline Field 3", value: "You can have a maximum of 25 fields.", inline: true})
    message.author.send(thisWeek)
  }
  // OTHER
  if (message.content === cfg.prefix) {
    message.author.send(sentence.error)
    setTimeout(() => { message.author.send(sentence.help) }, 1200)
  }
})
