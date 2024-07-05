import playingEmbed from "../../modules/playing/embed.js";
import playingButtons from "../../modules/playing/buttons.js";
import playingMenu from "../../modules/playing/menu.js";

export const data = {
  name: "modifyQueue",
  type: "distube",
};

export async function execute(queue) {
  try {
    const components = [playingMenu(queue), ...playingButtons(queue)].filter(
      Boolean
    );
    const playingMessage = queue.client.playingMessages.get(queue.id);
    await playingMessage?.edit({
      embeds: [playingEmbed(queue)],
      components,
    });
  } catch {
    // Ignore errors
  }
}
