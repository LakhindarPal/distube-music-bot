import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "repeat",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const mode = queue.setRepeatMode();

  const status = {
    0: "Turned off repeat mode.",
    1: "Now looping the current song.",
    2: "Now looping the entire queue.",
  }[mode];

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(status)],
  });
}
