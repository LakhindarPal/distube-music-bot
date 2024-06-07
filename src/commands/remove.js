import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "remove",
  description: "Remove a song from the queue",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "index",
      description: "The song index to remove",
      required: true,
      min_value: 1,
    },
  ],
};
export async function execute(interaction, queue) {
  const index = interaction.options.getNumber("index", true);

  if (!queue.songs[index]) {
    return interaction.reply({
      embeds: [ErrorEmbed("There is no song at that index!")],
    });
  }

  await queue._taskQueue.queuing();
  try {
    const [song] = queue.songs.splice(index, 1);

    interaction.reply({
      embeds: [SuccessEmbed(`Removed ${song.name} from the queue`)],
    });
  } finally {
    queue._taskQueue.resolve();
  }
}
