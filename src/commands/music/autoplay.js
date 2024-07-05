import { SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "autoplay",
  description: "Toggle autoplay mode",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const mode = queue.toggleAutoplay();

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(`${mode ? "Activated" : "Disabled"} autoplay mode.`)],
  });
}
