import { ApplicationCommandOptionType } from "discord.js";
import { defaultFilters } from "distube";
import { ErrorEmbed, SuccessEmbed } from "../utils/Embeds.js";

export const data = {
  name: "filter",
  description: "Toggle an audio filter",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "filter",
      description: "select the filter to toggle",
      required: true,
      choices: Object.keys(defaultFilters).map((key) => ({
        name: key,
        value: key,
      })),
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      name: "state",
      description: "Whether to enable or disable the filter",
      required: true,
    },
  ],
};
export function execute(interaction, queue) {
  const filter = interaction.options.getString("filter", true);
  const state = interaction.options.getBoolean("state", true);
  const filters = queue.filters;

  if (!filters.has(filter) && !state) {
    return interaction.reply({
      embeds: [ErrorEmbed(`\`${filter}\` filter is not enabled.`)],
    });
  }
  if (filters.has(filter) && state) {
    return interaction.reply({
      embeds: [ErrorEmbed(`\`${filter}\` filter is already enabled.`)],
    });
  }

  if (state) filters.add(filter);
  else filters.remove(filter);

  return interaction.reply({
    embeds: [
      SuccessEmbed(`${state ? "Enabled" : "Disabled"} the ${filter} filter.`),
    ],
  });
}
