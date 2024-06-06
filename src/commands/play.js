import { ApplicationCommandOptionType } from "discord.js";

export const data = {
  name: "play",
  description:
    "Play music from a supported URL (all provider) or search a query",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "input",
      description: "A supported URL or a search query",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      name: "skip",
      description: "Skip the current song (Available if vote skip is off)",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Number,
      name: "position",
      description: "Position will be added to the queue",
      required: false,
    },
  ],
};

export async function execute(interaction) {
  const input = interaction.options.getString("input", true);
  const skip = interaction.options.getBoolean("skip", false) ?? false;
  const position =
    interaction.options.getInteger("position", false) ?? undefined;
  const vc = interaction.member?.voice?.channel;

  await interaction.deferReply();

  await interaction.client.distube.play(vc, input, {
    skip,
    position,
    textChannel: interaction.channel ?? undefined,
    member: interaction.member,
    metadata: { interaction },
  });
}
