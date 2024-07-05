import { ErrorEmbed, SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "skip",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  if (queue.songs.length < 2 && !queue.autoplay) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("No next song available.")],
    });
  }

  await queue.skip();

  return interaction.reply({
    embeds: [SuccessEmbed("Skipped to the next song.")],
  });
}
