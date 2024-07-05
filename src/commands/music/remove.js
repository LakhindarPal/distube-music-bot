import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "remove",
  description: "Remove a song from the queue",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "position",
      description: "The position of the song to remove",
      required: true,
      min_value: 1,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const index = interaction.options.getNumber("position", true);

  if (!queue.songs[index]) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("No song found at that position.")],
    });
  }

  await queue._taskQueue.queuing();
  try {
    const [song] = queue.songs.splice(index, 1);

    interaction.reply({
      embeds: [SuccessEmbed(`Removed \`${song.name}\` from the queue`)],
    });
  } finally {
    queue._taskQueue.resolve();
  }

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);
}
