import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default (queue) => {
  const songs = queue.songs;
  if (songs.length < 2) return null;

  const menu = new StringSelectMenuBuilder()
    .setCustomId("songs_menu")
    .setPlaceholder(`${songs.length - 1} songs in queue`)
    .addOptions(
      songs
        .slice(1, 25)
        .map((song, index) =>
          new StringSelectMenuOptionBuilder()
            .setLabel(`${index + 1}. ${song.name}`)
            .setValue(index.toString())
        )
    );

  const row = new ActionRowBuilder().addComponents(menu);
  return row;
};
