import { Events } from "distube";

export const data = {
  name: Events.INIT_QUEUE,
  type: "distube",
};

export function execute(queue) {
  queue.volume = 70;
  queue.autoplay = true;
}
