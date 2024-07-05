import { Events } from "distube";

export const data = {
  name: Events.DELETE_QUEUE,
  type: "distube",
};

export async function execute(queue) {
  try {
    const message = queue.client.playingMessages.get(queue.id);
    await message?.delete();
  } catch {
    // Ignore errors
  }
}
