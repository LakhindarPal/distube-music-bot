import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "clear",
  description: "Clear next, previous or all songs.",
  options: [
    {
      name: "next",
      description: "Clear the next songs.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "previous",
      description: "Clear the previous songs.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "all",
      description: "Clear all the songs.",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const subcmd = interaction.options.getSubcommand();

  switch (subcmd) {
    case "next":
      if (queue.songs.length < 2) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("The queue is already empty.")],
        });
      }
      queue.songs.splice(1);
      break;

    case "previous":
      if (queue.previousSongs.length < 1) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("The history is already empty.")],
        });
      }
      queue.previousSongs.splice(0);
      break;

    default:
      if (queue.songs.length < 2 && queue.previousSongs.length < 1) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("No song available to clear.")],
        });
      }
      queue.songs.splice(1);
      queue.previousSongs.splice(0);
      break;
  }

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `Cleared ${subcmd === "all" ? "all the" : `the ${subcmd}`} songs.`
      ),
    ],
  });
}
