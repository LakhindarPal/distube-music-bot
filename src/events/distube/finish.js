import { Events } from "distube";
import { InfoEmbed } from "../../utils/Embeds.js";

export const data = {
  name: Events.FINISH,
  type: "distube",
};
export function execute(queue) {
  queue.textChannel?.send({
    embeds: [InfoEmbed("Finished playing all songs!")],
  });

  setTimeout(() => queue.voice.leave(), 60 * 1000);
}
