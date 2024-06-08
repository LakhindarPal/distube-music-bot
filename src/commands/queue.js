import { ApplicationCommandOptionType } from "discord.js";
import { BaseEmbed } from "../utils/Embeds.js";

export const data = {
  name: "queue",
  description: "Show the songs in the queue",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "page",
      description: "The page number (defaults to 1)",
      required: false,
      min_value: 1,
    },
  ],
};
export async function execute(interaction, queue) {
  if (!queue) return;
  const queueSongs = queue.songs.slice(1);
  const queueSize = queue.songs.length;

  let page = interaction.options.getNumber("page", false) ?? 1;

  const multiple = 10;

  const maxPage = Math.ceil(queueSize / multiple);

  if (page > maxPage) page = maxPage;

  const end = page * multiple;
  const start = end - multiple;

  const tracks = queueSongs.slice(start, end);

  const embed = BaseEmbed()
    .setDescription(
      tracks
        .map(
          (song, i) =>
            `**${start + i + 1}.** [${song.name}](${song.url}) ~ [${song.user.toString()}]`
        )
        .join("\n")
    )
    .setFooter({
      text: `Page ${page} of ${maxPage} | songs ${start + 1} to ${end > queueSize ? `${queueSize}` : `${end}`} of ${queueSize}`,
    });

  return interaction.reply({ embeds: [embed] });
}
