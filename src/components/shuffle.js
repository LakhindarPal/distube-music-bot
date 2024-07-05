import { ErrorEmbed, SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "shuffle",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  if (queue.songs.length < 3) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("Insufficient songs in the queue for shuffling.")],
    });
  }

  await queue.shuffle();

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [SuccessEmbed("Shuffled the songs in the queue.")],
  });
}
