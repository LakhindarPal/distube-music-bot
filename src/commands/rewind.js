import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "rewind",
  description: "Rewind the current song",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "time",
      description: "The time to go backward in seconds (defaults to 10)",
      min_value: 10,
      required: false,
    },
  ],
};
export function execute(interaction, queue) {
  const time = interaction.options.getNumber("time", false) ?? 10;
  const duration = queue.currentTime - time;

  if (duration < 0) {
    return interaction.reply({
      embeds: [ErrorEmbed("Cannot go backward that far!")],
    });
  }

  queue.seek(duration);

  return interaction.reply({
    embeds: [SuccessEmbed(`Rewinded ${time} seconds!`)],
  });
}
