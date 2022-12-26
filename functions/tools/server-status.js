const config = require("../../config.json");

const { EmbedBuilder } = require("discord.js");
const Nodeactyl = require("nodeactyl");
const ptero_client = new Nodeactyl.NodeactylClient(
  config.panelfqdn,
  config.pteroapikey
);

module.exports = (bot) => {
  bot.serverStatus = async () => {
    const channel = await bot.channels.cache.get(config.channelId);
    const msg = await channel.messages.fetch(config.messageId);

    ptero_client
    .getServerStatus(config.serverid)
    .then(function (serverStatus) {
      if (serverStatus == "running") {
        const embed = new EmbedBuilder()
          .setColor("#09A837")
          .setTitle("Server Status")
          .setDescription("Server is running - :green_circle: ")
          .setTimestamp()
          .setFooter({ text: "You're welcome for my service!" });
        msg.edit({ embeds: [embed] });
      } else if (serverStatus == "offline") {
        const embed = new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("Server Status")
          .setDescription("Server is offline - :red_circle: ")
          .setTimestamp()
          .setFooter({ text: "Bummer dude 😢" });
        msg.edit({ embeds: [embed] });
      } else if (serverStatus == "starting") {
        const embed = new EmbedBuilder()
          .setColor("#FBC42D")
          .setTitle("Server Status")
          .setDescription("Server is booting up - :yellow_circle: ")
          .setTimestamp()
          .setFooter({ text: "Get ready to rock! 😎" });
        msg.edit({ embeds: [embed] });
      }
    });
  };
};
