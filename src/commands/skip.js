import Embeds from "../utils/Embeds.js";

export const data = {
  name: "skip",
  description: "Skip to the next song",
};
export async function execute(interaction, queue) {
  if (queue.songs.length <= 2 && !queue.autoplay) {
    return interaction.reply({
      embeds: [Embeds.Error("There is no next song!")],
    });
  }

  await queue.skip();

  interaction.reply({
    embeds: [Embeds.Success("Playing the next song!")],
  });
}
