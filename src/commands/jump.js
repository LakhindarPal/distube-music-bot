import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed, WarningEmbed } from "../utils/Embeds.js";

export const data = {
  name: "jump",
  description: "Jump to a specific song in the queue",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "position",
      description:
        "The song position to play (The next one is 1, 2,... The previous one is -1, -2,...)",
      required: true,
    },
  ],
};
export async function execute(interaction, queue) {
  const position = interaction.options.getNumber("position", true);

  if (position > 0 && queue.songs.length <= 2 && !queue.autoplay) {
    return interaction.reply({
      embeds: [WarningEmbed("There is no upcoming song to jump to!")],
    });
  }
  if (position < 0 && queue.previousSongs.length < 1) {
    return interaction.reply({
      embeds: [WarningEmbed("There is no previous song to jump to!")],
    });
  }

  if (position === 0)
    return interaction.reply({
      embeds: [ErrorEmbed("Already at position 0")],
    });

  if (position > queue.songs.length)
    return interaction.reply({
      embeds: [
        ErrorEmbed(
          `Position must be less than or equal to ${queue.songs.length}`
        ),
      ],
    });
  if (position < -queue.previousSongs.length)
    return interaction.reply({
      embeds: [
        ErrorEmbed(
          `Position must be greater than or equal to ${queue.previousSongs.length}`
        ),
      ],
    });

  await queue.jump(position);

  return interaction.reply({
    embeds: [SuccessEmbed(`Jumped to position ${position}`)],
  });
}
