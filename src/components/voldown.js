import { SuccessEmbed, WarningEmbed } from "../modules/embeds.js";

export const data = {
  id: "voldown",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.volume === 0) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("Volume is already at minimum.")],
    });
  }

  const level = Math.max(queue.volume - 10, 0);

  queue.setVolume(level);

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume decreased to ${level}%.`)],
  });
}
