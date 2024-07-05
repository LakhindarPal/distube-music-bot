import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed } from "../../modules/embeds.js";

export const data = {
  name: "play",
  description: "Play music from a URL or search query.",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "input",
      description: "The music URL or search query",
      required: true,
      min_length: 1,
      max_length: 256,
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      name: "now",
      description: "Skip the current and play now",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Number,
      name: "position",
      description: "Position in the queue",
      required: false,
    },
  ],
  category: "music",
  validateVC: true,
};

export async function execute(interaction) {
  const vc = interaction.member?.voice?.channel;
  const checks = [
    {
      condition: !vc,
      message: "You need to join a voice channel first.",
    },
    {
      condition: !vc.viewable,
      message: "I need `View Channel` permission.",
    },
    {
      condition: !vc.speakable,
      message: "I need `Speak Channel` permission.",
    },
    {
      condition: !vc.joinable,
      message: "I need `Connect Channel` permission.",
    },
    {
      condition: vc.full,
      message: "Can't join, the voice channel is full.",
    },
    {
      condition: interaction.member.voice.deaf,
      message: "You cannot run this command while deafened.",
    },
    {
      condition: interaction.guild.members.me?.voice?.mute,
      message: "Please unmute me before playing.",
    },
  ];

  for (const check of checks) {
    if (check.condition)
      return interaction.reply({
        ephemeral: true,
        embeds: [ErrorEmbed(check.message)],
      });
  }

  const input = interaction.options.getString("input", true);
  const skip = interaction.options.getBoolean("now", false) ?? false;
  const position =
    interaction.options.getInteger("position", false) ?? undefined;

  await interaction.deferReply();

  await interaction.client.distube.play(vc, input, {
    skip,
    position,
    textChannel: interaction.channel ?? undefined,
    member: interaction.member,
    metadata: interaction,
  });
}
