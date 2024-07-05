import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "replay",
  description: "Replay the current song from the beginning",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (!queue.songs[0]) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("No song is currently playing.")],
    });
  }

  queue.seek(0);

  return interaction.reply({
    embeds: [SuccessEmbed("Replaying the current song.")],
  });
}
