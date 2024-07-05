import { SuccessEmbed, WarningEmbed } from "../../modules/embeds.js";

export const data = {
  name: "skip",
  description: "Skip to the next song",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  if (queue.songs.length < 2 && !queue.autoplay) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("No next song available.")],
    });
  }

  await queue.skip();

  return interaction.reply({
    embeds: [SuccessEmbed("Skipped to the next song.")],
  });
}
