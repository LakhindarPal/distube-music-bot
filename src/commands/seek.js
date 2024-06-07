import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";
import { getSongDurationInfo } from "../utils/songDuration.js";

export const data = {
  name: "seek",
  description: "Seek the current song",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "time",
      description: "The time to seek in seconds",
      required: true,
      min_value: 0,
    },
  ],
};
export function execute(interaction, queue) {
  const time = interaction.options.getNumber("time", true);
  const { duration } = getSongDurationInfo(queue.songs[0]);

  if (time > duration) {
    return interaction.reply({
      embeds: [ErrorEmbed("Cannot seek that far!")],
    });
  }

  queue.seek(time);

  return interaction.reply({
    embeds: [SuccessEmbed(`Seeked to ${time} seconds!`)],
  });
}
