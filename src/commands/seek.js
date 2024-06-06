import { ApplicationCommandOptionType } from "discord.js";
import Embeds from "../utils/Embeds.js";

export const data = {
  name: "seek",
  description: "Seek the current song",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "time",
      description: "The time to seek in seconds",
      required: true,
    },
  ],
};
export function execute(interaction, queue) {
  const time = interaction.options.getNumber("time", true);

  queue.seek(time);

  return interaction.reply({
    embeds: [Embeds.Success(`Seeked to ${time} seconds!`)],
  });
}
