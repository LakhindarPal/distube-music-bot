import { SuccessEmbed, WarningEmbed } from "../utils/Embeds.js";

export const data = {
  name: "resume",
  description: "Resume the current song",
};
export function execute(interaction, queue) {
  if (!queue.paused) {
    return interaction.reply({
      embeds: [WarningEmbed("The song is already playing!")],
    });
  }

  queue.resume();

  return interaction.reply({ embeds: [SuccessEmbed("Resumed the song!")] });
}
