import sourceIcons from "../../config/sourceIcons.js";
import { BaseEmbed } from "../embeds.js";

export default (queue, song) => {
  if (!song) song = queue.songs[0];
  const repeatMode = {
    0: "Off",
    1: "Song",
    2: "Queue",
  }[queue.repeatMode];
  const formattedSongDuration = song.stream.playFromSource
    ? song.formattedDuration
    : song.stream.song?.formattedDuration;

  const status = `Duration: ${formattedSongDuration}  |  Volume:  ${queue.volume}%
Repeat: ${repeatMode}  |  Autoplay: ${queue.autoplay ? "✅" : "❌"}`;

  return BaseEmbed()
    .setAuthor({
      name: `Now ${queue.paused ? "Paused" : "Playing"}`,
      iconURL: sourceIcons[song.source],
    })
    .setDescription(`[${song.name}](${song.url}) ~ [${song.user.toString()}]`)
    .setImage(song.thumbnail)
    .setFooter({ text: status });
};
