import { Events } from "distube";
import { ErrorEmbed } from "../../modules/embeds.js";

export const data = {
  name: Events.NO_RELATED,
  type: "distube",
};

export function execute(queue, error) {
  queue.textChannel?.send({ embeds: [ErrorEmbed(error.message)] });
}
