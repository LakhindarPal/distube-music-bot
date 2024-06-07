import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "shuffle",
  description: "Shuffle the queue's songs",
};
export async function execute(interaction, queue) {
  if (queue.songs.length < 3) {
    return interaction.reply({
      embeds: [
        ErrorEmbed("There must be at least 2 songs in the queue to shuffle"),
      ],
    });
  }

  await queue.shuffle();

  return interaction.reply({
    embeds: [SuccessEmbed("Shuffled songs in the queue")],
  });
}
