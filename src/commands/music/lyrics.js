import { ApplicationCommandOptionType } from "discord.js";
import { Client as GeniusClient } from "genius-lyrics";
import { ErrorEmbed, BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: "lyrics",
  description: "Get lyrics for a song.",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "query",
      description: "The name of the song.",
      required: false,
    },
  ],
  category: "music",
};

export async function execute(interaction, queue) {
  await interaction.deferReply({ ephemeral: true });

  const query =
    interaction.options.getString("query", false) ?? queue?.songs[0]?.name;

  if (!query) {
    return interaction.editReply({
      embeds: [ErrorEmbed("Provide a song name first.")],
    });
  }

  const genius = new GeniusClient();
  const [result] = await genius.songs.search(query).catch(() => [null]);

  if (!result) {
    return interaction.editReply({
      embeds: [ErrorEmbed("No song found with this name.")],
    });
  }

  let lyrics = await result.lyrics().catch(() => null);

  if (!lyrics) {
    return interaction.editReply({
      embeds: [ErrorEmbed("Failed to retrieve lyrics for this song.")],
    });
  }

  if (lyrics.length > 4096) lyrics = `${lyrics.slice(0, 4093)}...`;

  const embed = BaseEmbed()
    .setTitle(result.title)
    .setURL(result.url)
    .setThumbnail(result.thumbnail)
    .setAuthor({
      name: result.artist.name,
      iconURL: result.artist.image,
      url: result.artist.url,
    })
    .setDescription(lyrics);

  return interaction.editReply({ embeds: [embed] });
}
