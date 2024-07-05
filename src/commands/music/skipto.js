import { ApplicationCommandOptionType } from "discord.js";
import {
  ErrorEmbed,
  SuccessEmbed,
  WarningEmbed,
} from "../../modules/embeds.js";

export const data = {
  name: "skipto",
  description: "Skip to a specific song",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "position",
      description:
        "The song position (The next one is 1, 2,... The previous one is -1, -2,...)",
      required: true,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const position = interaction.options.getNumber("position", true);
  const songCount = queue.songs.length;
  const previousSongCount = queue.previousSongs.length;

  if (position > 0 && songCount <= 2 && !queue.autoplay) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("No next song available to skip to.")],
    });
  }

  if (position < 0 && previousSongCount < 1) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("No previous song available to skip to.")],
    });
  }

  if (position === 0) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("Already at 0th positioned song.")],
    });
  }

  if (position > songCount) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        ErrorEmbed(`Position must be less than or equal to ${songCount}.`),
      ],
    });
  }

  if (position < -previousSongCount) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        ErrorEmbed(
          `Position must be greater than or equal to -${previousSongCount}.`
        ),
      ],
    });
  }

  await queue.jump(position);

  return interaction.reply({
    embeds: [SuccessEmbed(`Skipped to the ${position} song.`)],
  });
}
