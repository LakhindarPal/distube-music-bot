import { Events } from "distube";
import Embeds from "../../utils/Embeds.js";

export const data = {
  name: Events.PLAY_SONG,
  type: "distube",
};
export function execute(queue, song) {
  queue.textChannel
    ?.send({ embeds: [Embeds.Info(`Playing: \`${song.name}\``)] })
    .catch(console.error);
}
