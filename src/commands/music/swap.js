import { ApplicationCommandOptionType } from "discord.js";
import {
  ErrorEmbed,
  SuccessEmbed,
  WarningEmbed,
} from "../../modules/embeds.js";

export const data = {
  name: "swap",
  description: "Swap the position of two songs in the queue",
  options: [
    {
      name: "first",
      description: "The position of the first song",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
    {
      name: "second",
      description: "The position of the second song",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const queueSize = queue.songs.length;
  if (queueSize < 3) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("Not enough songs in the queue to swap.")],
    });
  }

  const firstIndex = interaction.options.getNumber("first", true);
  const secondIndex = interaction.options.getNumber("second", true);

  if (firstIndex > queueSize || secondIndex > queueSize) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The specified positions are not valid.")],
    });
  }

  if (firstIndex === secondIndex) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The songs are already in this positions.")],
    });
  }

  const song1 = queue.songs[firstIndex];
  const song2 = queue.songs[secondIndex];

  [queue.songs[firstIndex], queue.songs[secondIndex]] = [
    queue.songs[secondIndex],
    queue.songs[firstIndex],
  ];

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `Swapped the position of \`${song1.name}\` and \`${song2.name}\`.`
      ),
    ],
  });
}
