/**
 * Retrieves the duration and formatted duration of a DisTube Song object.
 *
 * @param {import('distube').Song} song - The DisTube Song object.
 * @returns {{duration: number, formattedDuration: string}} An object containing the duration and formatted duration of the song.
 */
export function getSongDurationInfo(song) {
  const duration = song.stream.playFromSource
    ? song.duration
    : song.stream.song?.duration;

  const formattedDuration = song.stream.playFromSource
    ? song.formattedDuration
    : song.stream.song?.formattedDuration;

  return { duration, formattedDuration };
}
