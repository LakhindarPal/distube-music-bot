import { SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "leave",
  description: "Leave the voice channel.",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.voice) queue.voice.leave();

  return interaction.reply({
    embeds: [SuccessEmbed("Left the voice channel.")],
  });
}
