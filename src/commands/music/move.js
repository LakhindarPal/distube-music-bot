import { ApplicationCommandOptionType } from "discord.js";
import {
  ErrorEmbed,
  SuccessEmbed,
  WarningEmbed,
} from "../../modules/embeds.js";

export const data = {
  name: "move",
  description: "Move the position of a song in the queue",
  options: [
    {
      name: "from",
      description: "The current position of the song",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
    {
      name: "to",
      description: "The new position to move to",
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
      embeds: [ErrorEmbed("Not enough songs in the queue to move.")],
    });
  }

  const from = interaction.options.getNumber("from", true);
  const to = interaction.options.getNumber("to", true);

  if (from > queueSize) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The `from` position is not valid.")],
    });
  }

  if (to > queueSize) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The `to` position is not valid.")],
    });
  }

  if (from === to) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The song is already in this position.")],
    });
  }

  const [song] = queue.songs.splice(from, 1);
  queue.songs.splice(to, 0, song);

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    ephemeral: true,
    embeds: [SuccessEmbed(`Moved \`${song.name}\` to position ${to}.`)],
  });
}
