import Embeds from "../utils/Embeds.js";

export const data = {
  name: "stop",
  description: "Stop playing and delete the queue",
};
export async function execute(interaction, queue) {
  await queue.stop();
  queue.voice.leave();

  return interaction.reply({ embeds: [Embeds.Success("Stopped playing!")] });
}
