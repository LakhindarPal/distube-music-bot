import { SuccessEmbed, WarningEmbed } from "../../modules/embeds.js";

export const data = {
  name: "resume",
  description: "Resume the music",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (!queue.paused) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The music is already playing.")],
    });
  }

  queue.resume();

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({ embeds: [SuccessEmbed("Resumed the music.")] });
}
