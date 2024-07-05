import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "songs_menu",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const index = Number(interaction.values[0]) + 1;

  await queue.jump(index);

  return interaction.reply({
    embeds: [SuccessEmbed(`Skipped to the ${index} song.`)],
  });
}
