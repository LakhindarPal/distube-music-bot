import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "play",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.paused) {
    queue.resume();
  } else {
    queue.pause();
  }

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(`${queue.paused ? "Paused" : "Resumed"} the music.`)],
  });
}
