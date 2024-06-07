import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";
import { getSongDurationInfo } from "../utils/songDuration.js";

export const data = {
  name: "forward",
  description: "Forward the current song",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "time",
      description: "The time to go forward in seconds (defaults to 10)",
      min_value: 10,
      required: false,
    },
  ],
};
export function execute(interaction, queue) {
  const time = interaction.options.getNumber("time", false) ?? 10;
  const duration = queue.currentTime + time;
  const { duration: songDuration } = getSongDurationInfo(queue.songs[0]);

  if (duration > songDuration) {
    return interaction.reply({
      embeds: [ErrorEmbed("Cannot go forward that far!")],
    });
  }

  queue.seek(duration);

  return interaction.reply({
    embeds: [SuccessEmbed(`Forwarded ${time} seconds!`)],
  });
}
