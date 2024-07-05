import { SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "stop",
  description: "Stop the music",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  await queue.stop();

  return interaction.reply({ embeds: [SuccessEmbed("Stopped the music.")] });
}
