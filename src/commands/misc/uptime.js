import { time } from "discord.js";
import { BaseEmbed } from "../../modules/embeds.js";
import { formatDuration } from "distube";

export const data = {
  name: "uptime",
  description: "See how long I have been up",
  category: "misc",
};

export function execute(interaction) {
  const client = interaction.client;
  const upTime = formatDuration(client.uptime / 1000);
  const upSince = new Date(Date.now() - client.uptime);

  const embed = BaseEmbed()
    .setAuthor({
      name: client.user.tag,
      iconURL: client.user.displayAvatarURL(),
    })
    .setDescription(
      `**Up since:** ${time(upSince, "F")}
**Time:** ${upTime}`
    );

  return interaction.reply({ ephemeral: true, embeds: [embed] });
}
