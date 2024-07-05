import { Events } from "distube";
import { InfoEmbed } from "../../modules/embeds.js";

export const data = {
  name: Events.FINISH,
  type: "distube",
};

export function execute(queue) {
  queue.textChannel?.send({
    embeds: [InfoEmbed("Finished playing all songs.")],
  });

  // leave voice channel after 1 minute
  setTimeout(() => queue.voice.leave(), 60 * 1000);
}
