import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "previous",
  description: "Play the previous song",
};
export async function execute(interaction, queue) {
  if (queue.previousSongs.length < 1) {
    return interaction.reply({
      embeds: [ErrorEmbed("There is no previous song!")],
    });
  }

  await queue.previous();

  return interaction.reply({
    embeds: [SuccessEmbed("Playing the previous song!")],
  });
}
