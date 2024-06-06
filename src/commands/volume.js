import { ApplicationCommandOptionType } from "discord.js";
import Embeds from "../utils/Embeds.js";

export const data = {
  name: "volume",
  description: "Get or set the volume",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "percentage",
      description: "The percentage of volume you want to set",
      min_value: 0,
      max_value: 100,
      required: false,
    },
  ],
};
export function execute(interaction, queue) {
  const volume = interaction.options.getNumber("percentage", false);
  if (!volume)
    return interaction.reply({
      embeds: [Embeds.Info(`Current volume: \`${queue.volume}`)],
    });

  queue.setVolume(volume);
  interaction.reply({
    embeds: [Embeds.Success(`Volume set to \`${volume}\``)],
  });
}
