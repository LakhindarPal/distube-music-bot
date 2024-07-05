import { ApplicationCommandOptionType } from "discord.js";
import { RepeatMode } from "distube";
import { BaseEmbed, Colors } from "../../modules/embeds.js";

export const data = {
  name: "repeat",
  description: "Get or set repeat mode",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "status",
      description: "Show the current repeat mode.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "off",
      description: "Disable repeat mode.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "queue",
      description: "Repeat the entire queue.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "song",
      description: "Repeat the current song.",
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const subCmd = interaction.options.getSubcommand(true);

  let description;
  switch (subCmd) {
    case "off":
      queue.setRepeatMode(RepeatMode.DISABLED);
      description = "Turned off repeat mode.";
      break;
    case "song":
      queue.setRepeatMode(RepeatMode.SONG);
      description = "Now looping the current song.";
      break;
    case "queue":
      queue.setRepeatMode(RepeatMode.QUEUE);
      description = "Now looping the entire queue.";
      break;
    default: {
      const status = {
        0: "Off",
        1: "Song",
        2: "Queue",
      }[queue.repeatMode];

      description = `Current repeat mode: \`${status}\`.`;
    }
  }

  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  return interaction.reply({
    ephemeral: subCmd === "status",
    embeds: [
      BaseEmbed()
        .setDescription(description)
        .setColor(subCmd === "status" ? Colors.Blurple : Colors.Green),
    ],
  });
}
