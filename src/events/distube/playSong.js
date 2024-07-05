import { Events } from "distube";
import playingEmbed from "../../modules/playing/embed.js";
import playingButtons from "../../modules/playing/buttons.js";
import playingMenu from "../../modules/playing/menu.js";

export const data = {
  name: Events.PLAY_SONG,
  type: "distube",
};

export async function execute(queue, song) {
  try {
    const lastMessage = queue.client.playingMessages.get(queue.id);
    await lastMessage?.delete();
  } catch {
    // Ignore errors
  }

  const components = [playingMenu(queue), ...playingButtons(queue)].filter(
    Boolean
  );
  const newMessage = await queue.textChannel.send({
    embeds: [playingEmbed(queue, song)],
    components,
  });

  queue.client.playingMessages.set(queue.id, newMessage);
}
