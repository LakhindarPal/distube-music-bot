import { SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "autoplay",
  description: "Toggle autoplay mode",
};
export function execute(interaction, queue) {
  const autoplay = queue.toggleAutoplay();

  return interaction.reply({
    embeds: [
      SuccessEmbed(`AutoPlay mode \`${autoplay ? "activated" : "disabled"}\`.`),
    ],
  });
}
