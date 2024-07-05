import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "back",
  description: "Back to the previous song",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  if (queue.previousSongs.length < 1) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("No previous song available.")],
    });
  }

  await queue.previous();

  return interaction.reply({
    embeds: [SuccessEmbed("Went back to the previous song.")],
  });
}
