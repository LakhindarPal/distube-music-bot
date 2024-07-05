import { ErrorEmbed, SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "back",
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
