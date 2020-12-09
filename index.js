const Discord = require("discord.js");
const Client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "box1",] });
const prefix = "!"
const { MessageCollector } = require("discord.js-collector");
const mongoose =  require("mongoose");
const botconfig = require("./gorda.json");
const fps = require("./fps.js");
const pcn = require("./pcn.js");
const op = require("./opinion.js");
const mcn = require("./mcn.js");
const WS = require('./ws');
const codigos = require("./codigo.js")
const config = require('./config.json');
const { db } = require("./mcn.js");
var ws = new WS(config.ws.token, config.ws.port, Client);



//Base de datos
mongoose.connect(botconfig.mongoPass, {
 useNewUrlParser: true,
 useUnifiedTopology: true
 
});
console.log("Conectado a base de datos");



// Perfil del  bot 

Client.on('ready', (oldmember, newmember) => {
    console.log("Listo y operando");
    Client.user.setActivity("!ayuda", {
        type: "PLAYING",
        url: "https://www.twitch.tv/harkorfn"      
    });

});


// Add rol de reaccion consulta

Client.on("messageReactionAdd", async (reaction, user, message) => {
    // If a message gains a reaction and it is uncached, fetch and cache the message.
    // You should account for any errors while fetching, it could return API errors if the resource is missing.
    if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return; // If the user was a bot, return.
    if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
    if (reaction.message.guild.id !== "764721728228163624") return; // Use this if your bot was only for one server/private server.

    if (reaction.message.channel.id === "765256854610640896") { // This is a #self-roles channel.
        if (reaction.emoji.name === "⬇️") {
            const embedfps = new Discord.MessageEmbed()
            .setColor('#fffafa')
            .setTitle('Sigue el siguiente formato')
            .setAuthor('Micro Hub', 'https://i.ibb.co/LhqcLMN/logo.png', 'https://www.instagram.com/atlasleague/')
            .setDescription('Para empezar con el proceso de tu consulta sigue esta instruccion')
            .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
            .addField('-', 'Escribe **!fps** en el canal llamado "Empezar Consulta". Una vez hecho esto, nuestro bot te añadirá a un canal privado donde tendrás que responder a las preguntas que este te haga. Cabe destacar que, todas estas respuestas no se pueden cambiar, por ello, ten en cuenta que la respuesta que mandes, será la respuesta final. ', true)
            .setImage('https://i.ibb.co/JkjnZcy/gif3.gif')
            await reaction.message.guild.members.cache.get(user.id).roles.add("765262764443828266");
            return user.send(embedfps).catch(() => console.log("Failed to send DM."));

            
        }

        if (reaction.emoji.name === "🖥️") {
          const embedpcn = new Discord.MessageEmbed()
          .setColor('#fffafa')
          .setTitle('Sigue el siguiente formato')
          .setAuthor('Micro Hub', 'https://lh3.googleusercontent.com/AjX98AroEi5AdLxGVQpKdKKSUJBMXtHSCzv_eiHfCaJ0ggk2io-WQln85D1DvwTFSAAMdJW1ypBDu3SBvihUqdKYnyoE_0Dy5VnV-QCKdji8y4zRFTSxK5ZQkDSguyY2YeSsDdQ7nZNepuRD8olpeze1YQw-PolzklqRAJZJkYn1kuvVrEIwRJfAwmrQJkjdnfIyMiBSetOiHaRS-umJr9-czsjls_2sdsjVQJjkN7NUePyg0qmH5bSYvY5IM91gxaTHmLEpqSCAz96SgoNlyHmj9b6IQcj4IXB4UM3nDjGnW7_FCLoU8Cd9S5p2akhhQONbr8x6UfUtQhiLjTcowN0_oyhCyUkWfypQaOdReeKPHrqZApHrKHOr2YnRyJFLnDdO07WetbpZfKJfStL6vI6rMXBxoPvAaVO5LLepD_m6NYMKIYaPieYBl2MkYVjfz_VuYiKFhxgLQrUYKx3YY3GakfwCuur0Tfp-AWK4PiEcAYeKf0uLr6nb8NsLLNcGITaKtQwCPgVOFQ3qCPeHwo-0wJ7-9S0tIshLwORynzFPgsz60nhEHeTgNScoPSbXbyVdjrnbwL7jubgGnlGBX3w10yAPrnC-71gsjAox495LQpah0rquzXE74T6_66hFe5rqDVrVeoHkmDB-kiNHuYWz9n_gbDgYHmmYNZvhBzTGVyUCnoRS_w=s667-no?authuser=0', 'https://www.instagram.com/atlasleague/')
          .setDescription('Para empezar con el proceso de tu consulta sigue esta instruccion')
          .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
          .addField('-', 'Escribe **!pcn** en el canal llamado "Empezar Consulta". Una vez hecho esto, nuestro bot te añadirá a un canal privado donde tendrás que responder a las preguntas que este te haga. Cabe destacar que, todas estas respuestas no se pueden cambiar, por ello, ten en cuenta que la respuesta que mandes, será la respuesta final. ', true)
          .setImage('https://i.ibb.co/JkjnZcy/gif3.gif')
          await reaction.message.guild.members.cache.get(user.id).roles.add("766427685114740798"); // Box fight 2v2 role.
          return user.send(embedpcn).catch(() => console.log("Failed to send DM."));
        }

        if (reaction.emoji.name === "⬆️") {
          const embedpc = new Discord.MessageEmbed()
          .setColor('#fffafa')
          .setTitle('Sigue el siguiente formato')
          .setURL('https://www.instagram.com/harkorfn/')
          .setAuthor('Micro Hub', 'https://lh3.googleusercontent.com/AjX98AroEi5AdLxGVQpKdKKSUJBMXtHSCzv_eiHfCaJ0ggk2io-WQln85D1DvwTFSAAMdJW1ypBDu3SBvihUqdKYnyoE_0Dy5VnV-QCKdji8y4zRFTSxK5ZQkDSguyY2YeSsDdQ7nZNepuRD8olpeze1YQw-PolzklqRAJZJkYn1kuvVrEIwRJfAwmrQJkjdnfIyMiBSetOiHaRS-umJr9-czsjls_2sdsjVQJjkN7NUePyg0qmH5bSYvY5IM91gxaTHmLEpqSCAz96SgoNlyHmj9b6IQcj4IXB4UM3nDjGnW7_FCLoU8Cd9S5p2akhhQONbr8x6UfUtQhiLjTcowN0_oyhCyUkWfypQaOdReeKPHrqZApHrKHOr2YnRyJFLnDdO07WetbpZfKJfStL6vI6rMXBxoPvAaVO5LLepD_m6NYMKIYaPieYBl2MkYVjfz_VuYiKFhxgLQrUYKx3YY3GakfwCuur0Tfp-AWK4PiEcAYeKf0uLr6nb8NsLLNcGITaKtQwCPgVOFQ3qCPeHwo-0wJ7-9S0tIshLwORynzFPgsz60nhEHeTgNScoPSbXbyVdjrnbwL7jubgGnlGBX3w10yAPrnC-71gsjAox495LQpah0rquzXE74T6_66hFe5rqDVrVeoHkmDB-kiNHuYWz9n_gbDgYHmmYNZvhBzTGVyUCnoRS_w=s667-no?authuser=0', 'https://www.instagram.com/atlasleague/')
          .setDescription('Para empezar con el proceso de tu consulta sigue esta instruccion')
          .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
          .addField('-', 'Escribe **!mpc** en el canal llamado "Empezar Consulta". Una vez hecho esto, nuestro bot te añadirá a un canal privado donde tendrás que responder a las preguntas que este te haga. Cabe destacar que, todas estas respuestas no se pueden cambiar, por ello, ten en cuenta que la respuesta que mandes, será la respuesta final. ', true)
          .setImage('https://i.ibb.co/JkjnZcy/gif3.gif')
          await reaction.message.guild.members.cache.get(user.id).roles.add("785165729996734485"); // Box fight 2v2 role.
          return user.send(embedpc).catch(() => console.log("Failed to send DM."));
        }

        if (reaction.emoji.name === "🔧") {
          const embedpc = new Discord.MessageEmbed()
          .setColor('#fffafa')
          .setTitle('Sigue el siguiente formato')
          .setURL('https://www.instagram.com/harkorfn/')
          .setAuthor('Micro Hub', 'https://lh3.googleusercontent.com/AjX98AroEi5AdLxGVQpKdKKSUJBMXtHSCzv_eiHfCaJ0ggk2io-WQln85D1DvwTFSAAMdJW1ypBDu3SBvihUqdKYnyoE_0Dy5VnV-QCKdji8y4zRFTSxK5ZQkDSguyY2YeSsDdQ7nZNepuRD8olpeze1YQw-PolzklqRAJZJkYn1kuvVrEIwRJfAwmrQJkjdnfIyMiBSetOiHaRS-umJr9-czsjls_2sdsjVQJjkN7NUePyg0qmH5bSYvY5IM91gxaTHmLEpqSCAz96SgoNlyHmj9b6IQcj4IXB4UM3nDjGnW7_FCLoU8Cd9S5p2akhhQONbr8x6UfUtQhiLjTcowN0_oyhCyUkWfypQaOdReeKPHrqZApHrKHOr2YnRyJFLnDdO07WetbpZfKJfStL6vI6rMXBxoPvAaVO5LLepD_m6NYMKIYaPieYBl2MkYVjfz_VuYiKFhxgLQrUYKx3YY3GakfwCuur0Tfp-AWK4PiEcAYeKf0uLr6nb8NsLLNcGITaKtQwCPgVOFQ3qCPeHwo-0wJ7-9S0tIshLwORynzFPgsz60nhEHeTgNScoPSbXbyVdjrnbwL7jubgGnlGBX3w10yAPrnC-71gsjAox495LQpah0rquzXE74T6_66hFe5rqDVrVeoHkmDB-kiNHuYWz9n_gbDgYHmmYNZvhBzTGVyUCnoRS_w=s667-no?authuser=0', 'https://www.instagram.com/atlasleague/')
          .setDescription('Para empezar con el proceso de tu consulta sigue esta instruccion')
          .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
          .addField('-', 'Escribe **!mpc** en el canal llamado "Empezar Consulta". Una vez hecho esto, nuestro bot te añadirá a un canal privado donde tendrás que responder a las preguntas que este te haga. Cabe destacar que, todas estas respuestas no se pueden cambiar, por ello, ten en cuenta que la respuesta que mandes, será la respuesta final. ', true)
          .setImage('https://i.ibb.co/JkjnZcy/gif3.gif')
          await reaction.message.guild.members.cache.get(user.id).roles.add("766427685114740798"); // Box fight 2v2 role.
          return user.send(embedpc).catch(() => console.log("Failed to send DM."));
        }
        

    } else {
        return; // If the channel was not a #self-roles, ignore them.
    }
})


Client.on("messageReactionAdd", async (reaction, user, message) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

  if (reaction.message.channel.id === "766447645291708426") { // This is a #self-roles channel.
    if (reaction.emoji.name === "☑️") {
          const embedv = new Discord.MessageEmbed()
          .setColor('#fffafa')
          .setTitle('**¡Bienvenido a Micro Hub!**')
          .setAuthor('Micro Hub', 'https://i.ibb.co/CQPrZYP/logo.png', 'https://www.instagram.com/atlasleague/')
          .setDescription('**¡Esperamos que disfrutes de nuestros servicios!**')
          .setThumbnail('https://i.ibb.co/CQPrZYP/logo.png')
          .addField('**NUESTRAS REDES**', "**Instagram: https://www.instagram.com/atlasleague/** ")
          await reaction.message.guild.members.cache.get(user.id).roles.add("766075999745474562");
          return user.send(embedv).catch(() => console.log("Failed to send DM."));       
    }
  }
});

//Quita rol de reaccion verificado

Client.on("messageReactionRemove", async (reaction, user) => {
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; 
  if (reaction.message.guild.id !== "764721728228163624") return;

  if (reaction.message.channel.id === "766447645291708426") {
      if (reaction.emoji.name === "☑️") {
          await reaction.message.guild.members.cache.get(user.id).roles.remove("766075999745474562")
          return user.send("Removiendo permisos...").catch(() => console.log("Failed to send DM."));
      }
    }
  })

// Quita rol de reaccion consulta

Client.on("messageReactionRemove", async (reaction, user) => {
    // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return; // If the user was a bot, return.
    if (!reaction.message.guild) return; 
    if (reaction.message.guild.id !== "764721728228163624") return;

    if (reaction.message.channel.id === "765256854610640896") {
        if (reaction.emoji.name === "⬇️") {
            await reaction.message.guild.members.cache.get(user.id).roles.remove("765262764443828266")
            return user.send("Cancelando consulta...").catch(() => console.log("Failed to send DM."));
        }

        if (reaction.emoji.name === "🖥️") {
            await reaction.message.guild.members.cache.get(user.id).roles.remove("732390024070299788") 
            return user.send("Cancelando consulta...").catch(() => console.log("Failed to send DM."));
        }

        if (reaction.emoji.name === "⬆️") {
          await reaction.message.guild.members.cache.get(user.id).roles.remove("785165729996734485") 
          return user.send("Cancelando consulta...").catch(() => console.log("Failed to send DM."));
      }
    } else {
        return;
    }
})


// Comandos de texto

Client.on('message', async (message) => {

    try {

    if (!message.content.startsWith(prefix)) return;


//Consulta Rapida

if (message.content.startsWith(prefix + "cs")) {

  const cs = new Discord.MessageEmbed() 
  .setColor('#fffafa')
  .setTitle('Consulta Rápida')
  .setURL('https://www.instagram.com/harkorfn/')
  .setAuthor('Micro Hub', 'https://lh3.googleusercontent.com/AjX98AroEi5AdLxGVQpKdKKSUJBMXtHSCzv_eiHfCaJ0ggk2io-WQln85D1DvwTFSAAMdJW1ypBDu3SBvihUqdKYnyoE_0Dy5VnV-QCKdji8y4zRFTSxK5ZQkDSguyY2YeSsDdQ7nZNepuRD8olpeze1YQw-PolzklqRAJZJkYn1kuvVrEIwRJfAwmrQJkjdnfIyMiBSetOiHaRS-umJr9-czsjls_2sdsjVQJjkN7NUePyg0qmH5bSYvY5IM91gxaTHmLEpqSCAz96SgoNlyHmj9b6IQcj4IXB4UM3nDjGnW7_FCLoU8Cd9S5p2akhhQONbr8x6UfUtQhiLjTcowN0_oyhCyUkWfypQaOdReeKPHrqZApHrKHOr2YnRyJFLnDdO07WetbpZfKJfStL6vI6rMXBxoPvAaVO5LLepD_m6NYMKIYaPieYBl2MkYVjfz_VuYiKFhxgLQrUYKx3YY3GakfwCuur0Tfp-AWK4PiEcAYeKf0uLr6nb8NsLLNcGITaKtQwCPgVOFQ3qCPeHwo-0wJ7-9S0tIshLwORynzFPgsz60nhEHeTgNScoPSbXbyVdjrnbwL7jubgGnlGBX3w10yAPrnC-71gsjAox495LQpah0rquzXE74T6_66hFe5rqDVrVeoHkmDB-kiNHuYWz9n_gbDgYHmmYNZvhBzTGVyUCnoRS_w=s667-no?authuser=0', 'https://www.instagram.com/atlasleague/')
  .setDescription('Cual es tu problema?')
  .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
  .addFields(
      { name: 'Tu', value: "" },
  
  )
  .addField(`Consulta de: <@${userid}>`, 'Instagram: Micro Hub', true)
  .setTimestamp()
  .setFooter('Intentamos mantener nuestro tiempo de respuesta entre 1 a 2 dias.', 'https://lh3.googleusercontent.com/ogw/ADGmqu9vEiBnruOw5eKD-pRdPqg1Oz9EH3db19s6CZE=s32-c-mo');
  
  channel.send(cs);


}


//Consulta FPS 

    if (message.content.startsWith(prefix + "fps")) {
        if (!message.member.roles.cache.find(r => r.name === "fps")) {

        
        }

        else {
            var server = message.guild;
            const name = message.author.username; 
            const userid = message.author.id  
            const everyone = "764721728228163624"     
               console.log("Variables definidas")
                server.channels.create(name, {
                    type: 'text',
                    parent: '765722009984040982',
                    permissionOverwrites: [
                      {
                        id: everyone, // shortcut for @everyone role ID
                        deny: 'VIEW_CHANNEL'
                      },
                      {
                        id: userid,
                        allow: 'VIEW_CHANNEL'
                      }
                    ]
                    
                  })
                    .then(channel => {
                    channel.setParent('765722009984040982');
                    var canalp = channel.id
                    message.guild.members.cache.get(userid).roles.remove("765262764443828266")
                    console.log("Rol Removido, prosigue con tu consulta");
                    channel = Client.channels.cache.get(canalp)  
                    console.log("Mensaje Enviado")   
                    //nombre
                    channel.send("Escribe tu nombre completo").then(() => {
                        const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
                        channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
                        .then(async messages => {
                          let nombre = messages.first().content
                          //correo
                          channel.send("Escribe tu correo electrónico").then(() => {
                            channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                            .then(async messages2 => {
                              let correo = messages2.first().content
                              //specs
                              channel.send("Escribe tus componentes (Si no sabes cómo conseguir estos datos, puedes descargar este programa (El programa aparecerá en unos segundos...))")
                              const specy = new Discord.MessageAttachment('./spsetup132.exe')
                              channel.send(specy)
                              channel.send ('https://i.ibb.co/WsKY4t7/gift.gif')
                              .then(() => {
                                channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                                .then(async messages3 => {
                                  let specs = messages3.first().content
                                    //juego
                              channel.send("Juego en el cual ocurre el problema").then(() => {
                                channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                                .then(async messages4 => {
                                  let juego = messages4.first().content
                                  //info extra
                              channel.send("Información Adicional").then(() => {
                                channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                                .then(async messages5 => {
                                  let info = messages5.first().content

                                    const fpsembed = new Discord.MessageEmbed() 
                                    .setColor('#fffafa')
                                    .setTitle('Formulario de tu consulta (FPS)')
                                    .setURL('https://www.instagram.com/harkorfn/')
                                    .setAuthor('Micro Hub', 'https://i.ibb.co/LhqcLMN/logo.png', 'https://www.instagram.com/atlasleague/')
                                    .setDescription('Recibirás un mensaje con la solución a tu consulta entre 2-3 días, sin embargo, si requiere de mayor asistencia, se te asignará una cita con un especialista.')
                                    .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
                                    .addFields(
                                        { name: 'Tu Nombre Completo', value: nombre },
                                        { name: 'Tu Correo Electrónico', value: correo },
                                        { name: 'Hardware de tu PC', value: specs },
                                        { name: 'Juego/s Problema', value: juego},
                                        { name: 'Información Adicional', value: info},
                                    )
                                    .addField(`Consulta de: <@${userid}>`, 'Instagram: **Micro Hub**', true)
                                    .setTimestamp()
                                    .setFooter('Intentamos mantener nuestro tiempo de respuesta entre 2 a 3 días.', 'https://i.ibb.co/LhqcLMN/logo.png');
                                    console.log ("apunto de conectarse")
                                     


                                    fps.findOne({

                                      userid: userid
                                    },(err, data)=>{
                                      if(err)console.log(err);
                                      if(!data){
                                        const cfps = new fps({
                                          userid: userid,
                                          nombre: nombre,
                                          correo: correo,
                                          specs: specs,
                                          juegop: juego,
                                          info: info,
                                        })    
                                      cfps.save().catch(err => console.log(err))
                                      console.log("Data almacenada")
                                      }
                                    })
                                    channel.send(fpsembed);
                                    const harkor = Client.users.cache.get("245215441725685770");
                                    harkor.send(fpsembed);
                                    const anthony = Client.users.cache.get("184766674635849728");
                                    anthony.send(fpsembed);
                                }).catch(() => {
                                   
                                    })
                                })
                                }).catch(() => {
                                    
                                    })
                                })
                                }).catch(() => {
                               
                                })
                              })
                            }).catch(() => {
                              
                            })
                          })
                        }).catch(() => {
                          
                        })
                      })
                    
            })
         }
     
    }

//Consulta PC

    if (message.content.startsWith(prefix + "pcn")) {
      if (!message.member.roles.cache.find(r => r.name === "pcn")) {
      
      }

      else {
          var server = message.guild;
          const name = message.author.username; 
          const userid = message.author.id  
          const everyone = "764721728228163624"     
             console.log("Variables definidas")
              server.channels.create(name, {
                  type: 'text',
                  parent: '765722009984040982',
                  permissionOverwrites: [
                    {
                      id: everyone, // shortcut for @everyone role ID
                      deny: 'VIEW_CHANNEL'
                    },
                    {
                      id: userid,
                      allow: 'VIEW_CHANNEL'
                    }
                  ]
                  
                })
                  .then(channel => {
                  channel.setParent('765722009984040982');
                  var canalp = channel.id
                  message.guild.members.cache.get(userid).roles.remove("766427685114740798")
                  console.log("Rol Removido, prosigue con tu consulta");
                  channel = Client.channels.cache.get(canalp)  
                  console.log("Mensaje Enviado")   
                  //nombre
                  channel.send("Escribe tu nombre completo.").then(() => {
                      const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
                      channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
                      .then(async messages => {
                        let nombre = messages.first().content
                        //correo
                        channel.send("Escribe tu correo electrónico.").then(() => {
                          channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                          .then(async messages2 => {
                            let correo = messages2.first().content
                            //uso
                            channel.send("¿Qué aplicaciones y/o juegos usas regularmente?").then(() => {
                              channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                              .then(async messages3 => {
                                let uso = messages3.first().content
                                  //juego
                            channel.send("Digita tu presupuesto (En COP; mínimo 1.000.000).").then(() => {
                              channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                              .then(async messages4 => {
                                let presupuesto = messages4.first().content
                                //info extra
                            channel.send("FPS deseados o rendimiento deseado para cada una de las aplicaciones mencionadas.").then(() => {
                              channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                              .then(async messages5 => {
                                let info = messages5.first().content

                                  const fpsembed = new Discord.MessageEmbed() 
                                  .setColor('#fffafa')
                                  .setTitle('Formulario de tu consulta (PC)')
                                  .setURL('https://www.instagram.com/harkorfn/')
                                  .setAuthor('Micro Hub', 'https://i.ibb.co/LhqcLMN/logo.png', 'https://www.instagram.com/atlasleague/')
                                  .setDescription('Recibirás un mensaje con la solución a tu consulta entre 2-3 días, sin embargo, si requiere de mayor asistencia, se te asignará una cita con un especialista.')
                                  .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
                                  .addFields(
                                      { name: 'Tu Nombre Completo', value: nombre },
                                      { name: 'Tu Correo Electrónico', value: correo },
                                      { name: 'Aplicaciones de uso regular', value: uso },
                                      { name: 'Presupuesto', value: presupuesto},
                                      { name: 'Rendimiento Deseado', value: info},
                                  )
                                .addField(`Consulta de: <@${userid}>`, 'Instagram: Micro Hub', true)
                                  .setTimestamp()
                                  .setFooter('Intentamos mantener nuestro tiempo de respuesta entre 2 a 3 días.', 'https://i.ibb.co/LhqcLMN/logo.png');
                                  
                                  
                                  pcn.findOne({

                                    userid: userid
                                  },(err, data)=>{
                                    if(err)console.log(err);
                                    if(!data){
                                      const cpcn = new pcn({
                                        nombre: nombre,
                                        userid: userid, 
                                        correo: correo,
                                        presu: presupuesto,
                                        uso: uso,
                                        info: info,
                                      })    
                                    cpcn.save().catch(err => console.log(err))
                                    console.log("Data almacenada")
                                    }
                                  })



                                  channel.send(fpsembed);
                                  const harkor = Client.users.cache.get("245215441725685770");
                                  harkor.send(fpsembed);
                                  const anthony = Client.users.cache.get("184766674635849728");
                                  anthony.send(fpsembed);
                              }).catch(() => {
                                  
                                  })
                              })
                              }).catch(() => {
                                  
                                  })
                              })
                              }).catch(() => {
                              
                              })
                            })
                          }).catch(() => {
                           
                          })
                        })
                      }).catch(() => {
                      
                      })
                    })
                  
          })
       }
   
  }

  if (message.content.startsWith(prefix + "mcn")) {
    if (!message.member.roles.cache.find(r => r.name === "mcn")) {
    
    }

    else {
      var server = message.guild;
            const name = message.author.username; 
            const userid = message.author.id  
            const everyone = "764721728228163624"     
               console.log("Variables definidas")
                server.channels.create(name, {
                    type: 'text',
                    parent: '765722009984040982',
                    permissionOverwrites: [
                      {
                        id: everyone, // shortcut for @everyone role ID
                        deny: 'VIEW_CHANNEL'
                      },
                      {
                        id: userid,
                        allow: 'VIEW_CHANNEL'
                      }
                    ]
                    
                  })
                    .then(channel => {
                    channel.setParent('765722009984040982');
                    var canalp = channel.id
                    message.guild.members.cache.get(userid).roles.remove("785165729996734485")
                    console.log("Rol Removido, prosigue con tu consulta");
                    channel = Client.channels.cache.get(canalp)  
                    console.log("Mensaje Enviado")   
                    //nombre
                    channel.send("Escribe tu nombre completo").then(() => {
                        const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
                        channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
                        .then(async messages => {
                          let nombre = messages.first().content
                          //correo
                          channel.send("Escribe tu correo electrónico").then(() => {
                            channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                            .then(async messages2 => {
                              let correo = messages2.first().content
                              //specs
                              channel.send("Escribe tus componentes (Si no sabes cómo conseguir estos datos, puedes descargar este programa (El programa aparecerá en unos segundos...))")
                              const specy = new Discord.MessageAttachment('./spsetup132.exe')
                              channel.send(specy)
                              channel.send ('https://i.ibb.co/WsKY4t7/gift.gif')
                              .then(() => {
                                channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                                .then(async messages3 => {
                                  let specs = messages3.first().content
                                    //juego
                              channel.send("Rendimiento deseado en la aplicación y/o juego (en FPS o rendimiento general)").then(() => {
                                channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                                .then(async messages4 => {
                                  let juego = messages4.first().content
                                  //info extra
                              channel.send("Información Adicional.").then(() => {
                                channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                                .then(async messages5 => {
                                  let info = messages5.first().content

                                    const fpsembed = new Discord.MessageEmbed() 
                                    .setColor('#fffafa')
                                    .setTitle('Formulario de tu consulta (FPS)')
                                    .setURL('https://www.instagram.com/harkorfn/')
                                    .setAuthor('Micro Hub', 'https://i.ibb.co/LhqcLMN/logo.png', 'https://www.instagram.com/atlasleague/')
                                    .setDescription('Recibirás un mensaje con la solución a tu consulta entre 2-3 días, sin embargo, si requiere de mayor asistencia, se te asignará una cita con un especialista.')
                                    .setThumbnail('https://lh3.googleusercontent.com/xzIAMw2AJld8rJoTFoR-xhEt1ItJChSA5cXoIDyEWjooRV5P0mFxFYzbJ-dIN-6TMdivKxYIgncc528tKfgkeJ_R2d4MxbOANYscT0AYe8YkaGpRN0QGQBz35TRM1rgAEdSjqkCU46gNje3V4A4AOCbYMVChdoHRS9yOpTH4OSwM2g49Ywr6zYaHvx5UsB-yZ8la4IafzeNel9QVPOkrvVQR6BrFfKASp-fccjefqTLH-x6tPGQQE7T3fR7iHZOACbGfEaHBwLp8XikvCVnWsZhJY91J7lix8m5SFlQWomy3zK_r6mgJE6q5LDW8ruBRz8JDNwy-JbnjgeQlmwsEKssypbvCb07YGC7pS10lNVCCAQ5HOpAbuY8B0m9KhzHDGPzaFi8o3Ul_GHa9HKDYSKfAs8ahPFyyjD7VLQS5P3_X2huWcp5by7KzL0xUhfy7UPIErVAnMoDJxy9NMhWO4qY6mgVjjK-6pWlAC6-Jn68iArsn4PtnY-rJThlpT4xVURTKXqfsAE68_OJaWh8UpLa5ghRSaiB-Xzqr91K4Imt1hgqFMaYKkN806j_rrqdsotI7umiGNv8Li3M7O_xFug9rn85O-LpIpiM9nhN8FDYItN9PfTaCdSdBW78D7tNmkWS_pnFaxIdaNYXKrTORDLBqErHWRGltOFdg2cVmU3Hdk3W94z4uDw=s667-no?authuser=0')
                                    .addFields(
                                        { name: 'Tu Nombre Completo', value: nombre },
                                        { name: 'Tu Correo Electrónico', value: correo },
                                        { name: 'Hardware de tu PC', value: specs },
                                        { name: 'Rendimiento Deseado en las aplicaciones y/o juegos', value: juego},
                                        { name: 'Información Adicional', value: info},
                                    )
                                    .addField(`Consulta de: <@${userid}>`, 'Instagram: **Micro Hub**', true)
                                    .setTimestamp()
                                    .setFooter('Intentamos mantener nuestro tiempo de respuesta entre 2 a 3 días.', 'https://i.ibb.co/LhqcLMN/logo.png');
                                    console.log ("apunto de conectarse")
                                     


                                    mcn.findOne({

                                      userid: userid
                                    },(err, data)=>{
                                      if(err)console.log(err);
                                      if(!data){
                                        const cfps = new mcn({
                                          userid: userid,
                                          nombre: nombre,
                                          correo: correo,
                                          specs: specs,
                                          juegop: juego,
                                          info: info,
                                        })    
                                      cfps.save().catch(err => console.log(err))
                                      console.log("Data almacenada")
                                      }
                                    })
                                    channel.send(fpsembed);
                                    const harkor = Client.users.cache.get("245215441725685770");
                                    harkor.send(fpsembed);
                                    const anthony = Client.users.cache.get("184766674635849728");
                                    anthony.send(fpsembed);
                                }).catch(() => {
                                   
                                    })
                                })
                                }).catch(() => {
                                    
                                    })
                                })
                                }).catch(() => {
                               
                                })
                              })
                            }).catch(() => {
                              
                            })
                          })
                        }).catch(() => {
                          
                        })
                      })
                    
            })
         }
  }
  
// Creador de mensajes 2 
  if (message.content.startsWith(prefix + "718923789123712983879")) { 
    var channel = Client.channels.cache.get("768702132169605130")  
    channel.send("Escribe el titulo").then(() => {
      const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
      channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
      .then(async messages => {
        let titulo = messages.first().content 
        channel.send("Escribe el testo").then(() => {
          channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
          .then(async messages => {
            let testo = messages.first().content 
            
            channel.send("ID de canal de destino").then(() => {
              channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
              .then(async messages => {
                let destino = messages.first().content 
                var channel = Client.channels.cache.get(destino)  
            
            const sendembed = new Discord.MessageEmbed() 
            .setColor('#fffafa')
            .setTitle(titulo)
            .setAuthor('Micro Hub', 'https://i.ibb.co/CQPrZYP/logo.png', 'https://www.instagram.com/atlasleague/')
            .setDescription(testo)
            .setThumbnail('https://i.ibb.co/JK6rmyR/insta.png')
            .setFooter('Gracias por confiar en Micro Hub', 'https://i.ibb.co/CQPrZYP/logo.png');
            
            channel.send(sendembed);
          }).catch(() => {
            message.channel.send("No ingresaste nada!")
            })
          }).catch(() => {
            message.channel.send("No ingresaste nada!")
            })
      }).catch(() => {
        message.channel.send("No ingresaste nada!")
        })
      })
  })
    })
}

if (message.content.startsWith(prefix + "78934789238942389")) { 
  var channel = Client.channels.cache.get("768702132169605130")  
  channel.send("Escribe el titulo").then(() => {
    const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
    channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
    .then(async messages => {
      let titulo = messages.first().content 
      channel.send("Escribe el testo").then(() => {
        channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
        .then(async messages => {
          let testo = messages.first().content 
          
          channel.send("ID de canal de destino").then(() => {
            channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
            .then(async messages => {
              let destino = messages.first().content 
              var channel = Client.channels.cache.get(destino)  
          
          
          channel.send(`${titulo}`);

        }).catch(() => {
          message.channel.send("No ingresaste nada!")
          })
        }).catch(() => {
          message.channel.send("No ingresaste nada!")
          })
    }).catch(() => {
      message.channel.send("No ingresaste nada!")
      })
    })
})
  })
}


if (message.content.startsWith(prefix + "781273618723617823612783")) {
  
  
  message.channel.send("Escribe el código a ingresar en la base de datos.").then(() => {
    const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
    message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
    .then(async messages => {
      let codigoi = messages.first().content

    const codigoid = new codigos ({

      codigoidi: codigoi, 
    })
    
    codigoid.save().then (message.channel.send(`Codigo ${codigoi} ingresado en la base de datos`));



}).catch(() => {
                                
})

})

}



if (message.content.startsWith(prefix + "reclamar")) {
  
  message.author.send("Escribe el código a reclamar.").then(() => {
    const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
    message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
    .then(async messages => {
      let codigor = messages.first().content

   const red = await codigos.findOneAndDelete({codigoidi: codigor});
   if (!red){
     message.channel.send("Código Invalido")
   }
   else
   { 
   console.log ("codigo valido");
   const guild= Client.guilds.cache.get('764721728228163624');

   var dmUser = message.author.id;
 
   var Member = guild.members.fetch(dmUser)
   console.log("Variables definidas")
   if (Member){
     console.log("Anthony es cachon")
   ;(await Member).roles.add('766710168825888828').then(message.author.send(`El código ${red.codigoidi} ha sido redimido`));
   }
   }

 



}).catch(() => {
                                
})

})

}



if (message.content.startsWith(prefix + "opinion")) {
 
    
    message.channel.send("Del 1 al 5, ¿Te solucionamos tu problema?").then(() => {
      const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
      message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
      .then(async messages => {
        let solpro = Number(messages.first().content)
   
      //correo      
      message.channel.send("Del 1 al 5, ¿Qué tal te pareció el tiempo de respuesta?").then(() => {
        message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
        .then(async messages2 => {
          let tiempo = Number(messages2.first().content)
         
      
          //uso
          
          message.channel.send("Del 1 al 5 ¿Qué tan satisfecho quedaste con nuestros servicios?").then(() => {
            message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
            .then(async messages3 => {
              let uso = messages3.first().content
              
                //juego
          
          message.channel.send("¿Recomendaría nuestros servicios? (Escriba Si o No únicamente)").then(() => {
            message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
            .then(async messages4 => {
              let rec = messages4.first().content
            
     
              if(rec == "Si" || rec == "si" ){
                recb=1;
            
              }
              else{
                if(rec =="No" || rec =="no"){
                  recb=0;
                }               
              }
              message.channel.send("¿Qué recomendaciones tienes para mejorar nuestros servicios?").then(() => {
                message.channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']})
                .then(async messages5 => {
                  let opinion = messages5.first().content
              
              op.findOne({

                solucion: solpro
              },(err, data)=>{
                if(err)console.log(err);
                if(!data){
                  const cop = new op({
                    solucion: solpro,
                    tiempor: tiempo, 
                    satisfecho: uso,
                    recomendar: recb,
                    opinion: opinion,
                  })    
                cop.save().catch(err => console.log(err))
                console.log("Data almacenada")
                }
              })
              var channel_id = message.channel.id
              const fetchedChannel = message.guild.channels.cache.get(channel_id);
              fetchedChannel.delete();
              console.log("Consulta Terminada")
                })
              })
            })
          })
            })
          })
        })
      })
      })
    })      
      
            }





// Comando Ayuda

    if (message.content.startsWith(prefix + "ayuda")) { // Comando de "Ayuda" para ver los comandos disponibles
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#fffafa')
            .setTitle('Comandos')
            .setURL('https://www.instagram.com/harkorfn/')
            .setAuthor('Micro Hub', 'https://ibb.co/Jn0DbLL', 'https://www.instagram.com/atlasleague/')
            .setDescription('Bienvenido a Micro Hub, donde podrás')
            .setThumbnail('https://ibb.co/Jn0DbLL')
            .addFields(
                { name: 'Comandos', value: 'Prefijo #' },
            )
            .addField('Se aceptan sugerencias', 'Instagram: Micro Hub', true)
            .setTimestamp()
            .setFooter('Espero que disfrutes el bot!', 'https://ibb.co/Jn0DbLL');

        message.channel.send("Revisa tus mensajes privados").then(msg => msg.delete({ timeout: 3000 }));
        message.author.send(exampleEmbed);     
    }
      
// Mensaje de Reacciones de Consulta
    if (message.content.startsWith(prefix + "23894723894278943274893274")) { //Creador de ticket
        let channel = Client.channels.cache.get("765256854610640896"); //Discord channel id Matchmaking 1v1 boxfight
        const embed3 = new Discord.MessageEmbed()
            .setColor('#fffafa')
            .setTitle("¡Selecciona tu tema de consulta!")
            .setDescription(`⬇️ **Bajones de FPS** \n\n 🖥️ **Adquirir un PC para cierto uso** \n\n ⬆️ **Mejorar tu PC actual** \n\n `)
        channel.send(embed3).then(async msg => {
            await msg.react("⬇️")
            await msg.react("🖥️")
            await msg.react("⬆️")
        })
    }

    if (message.content.startsWith(prefix + "3724893274892234324")) { //Creador de ticket
      let channel = Client.channels.cache.get("766447645291708426"); //Discord channel id Matchmaking 1v1 boxfight
      channel.send((`
      
      **¡BIENVENIDO A MICRO HUB!**
      
      
📣 Si quieres participar en el servidor reacciona presionando ☑️ en la parte inferior y obtendrás el rango de miembro. Luego de esto, podrás iniciar procesos de consulta, ver los chats de la comunidad y disfrutar del servidor.
      
➡️Si reaccionaste y no te fue asignado el rango de miembro, remueve tu reacción y reacciona nuevamente.

➡️Si el problema persiste, comunicate con <@245215441725685770> <@184766674635849728> <@211320047669477376> para resolver el inconveniente lo más pronto posible.


`)).then(async msg => {
          await msg.react("☑️")
      })
  }

//Poll Feedback

if (message.content.startsWith(prefix + "feedback")) { 
  let channel = Client.channels.cache.get("766709383576027208");
  channel.send("Escribe tu recomendación de la manera más detallada posible.").then(() => {
    const filter = m => m.author.id == message.author.id //this ensures that it's waiting messages from the person who sent the message
    channel.awaitMessages(filter, {time: 600000, max: 1, errors: ['time']}) //the time variable is the amount of milliseconds it should wait for, change this accordingly
    .then(async messages => {
      let idea = messages.first().content
      let channel2 = Client.channels.cache.get("773373324884705331");
      let embedPoll = new Discord.MessageEmbed()
      .setTitle('**FEEDBACK** ')
      .setDescription(idea)
      .setColor('fffafa')
      let msgEmbed = await channel2.send(embedPoll);
      await msgEmbed.react('👍')
      await msgEmbed.react('👎')
      channel2.send(msgEmbed)
})
  })
}



}
    catch (err) {
        console.log("error con los comandos")
    }
})

  




Client.login(process.env.TOKEN); 



    
  