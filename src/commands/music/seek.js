import { ApplicationCommandOptionType } from "discord.js";
import { SuccessEmbed, ErrorEmbed } from "../../modules/embeds.js";
import { timeToSecond } from "../../modules/utils.js";
import { formatDuration } from "distube";

export const data = {
  name: "seek",
  description: "Seek the song to a another timestamp.",
  options: [
    {
      name: "timestamp",
      description: "The timestamp to seek to (mm:ss).",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const timestring = interaction.options.getString("timestamp", true);
  const time = timeToSecond(timestring);

  const song = queue.songs[0];

  if (!song) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("No song is currently playing.")],
    });
  }

  const songDuration = song.stream.playFromSource
    ? song.duration
    : song.stream.song?.duration;
  const formattedSongDuration = song.stream.playFromSource
    ? song.formattedDuration
    : song.stream.song?.formattedDuration;

  if (time > songDuration) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        ErrorEmbed(
          `Provide a valid timestamp within 00:00 and ${formattedSongDuration}.`
        ),
      ],
    });
  }

  queue.seek(time);

  return interaction.reply({
    embeds: [SuccessEmbed(`Seeked to ${formatDuration(time)}.`)],
  });
}
