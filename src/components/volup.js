import { SuccessEmbed, WarningEmbed } from "../modules/embeds.js";

export const data = {
  id: "volup",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.volume === 100) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("Volume is already at maximum.")],
    });
  }

  const level = Math.min(queue.volume + 10, 100);

  queue.setVolume(level);

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume increased to ${level}%.`)],
  });
}
