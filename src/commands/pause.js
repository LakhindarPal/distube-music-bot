import { SuccessEmbed, WarningEmbed } from "../utils/Embeds.js";

export const data = {
  name: "pause",
  description: "Pause the current song",
};
export function execute(interaction, queue) {
  if (queue.paused) {
    return interaction.reply({
      embeds: [WarningEmbed("The song is already paused!")],
    });
  }

  queue.pause();
  return interaction.reply({ embeds: [SuccessEmbed("Paused the song!")] });
}
