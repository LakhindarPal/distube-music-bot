import { ApplicationCommandOptionType } from "discord.js";
import { RepeatMode } from "distube";
import { SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "repeat",
  description: "Set the repeat mode",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "mode",
      description: "The new mode to set",
      required: true,
      choices: [
        { name: "Off", value: RepeatMode.DISABLED },
        { name: "Song", value: RepeatMode.SONG },
        { name: "Queue", value: RepeatMode.QUEUE },
      ],
    },
  ],
};
export function execute(interaction, queue) {
  const mode = interaction.options.getNumber("mode", true);

  queue.setRepeatMode(mode);
  const status = mode ? (mode === 2 ? "Queue" : "Song") : "Off";

  interaction.reply({
    embeds: [SuccessEmbed(`Repeat mode set to \`${status}\``)],
  });
}
