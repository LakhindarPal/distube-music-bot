import { SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "stop",
  description: "Stop playing and leave the voice channel",
};
export async function execute(interaction, queue) {
  await queue.stop();
  queue.voice.leave();

  return interaction.reply({ embeds: [SuccessEmbed("Stopped playing!")] });
}
