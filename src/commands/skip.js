import { SuccessEmbed, WarningEmbed } from "../utils/Embeds.js";

export const data = {
  name: "skip",
  description: "Skip to the next song",
};
export async function execute(interaction, queue) {
  if (queue.songs.length < 2 && !queue.autoplay) {
    return interaction.reply({
      embeds: [WarningEmbed("There is no next song!")],
    });
  }

  await queue.skip();

  return interaction.reply({
    embeds: [SuccessEmbed("Playing the next song!")],
  });
}
