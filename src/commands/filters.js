import { ApplicationCommandOptionType } from "discord.js";
import { defaultFilters } from "distube";
import Embeds from "../utils/Embeds.js";

export const data = {
  name: "filter",
  description: "Toggle a filter",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "filter",
      description: "The filter to toggle",
      required: true,
      choices: Object.keys(defaultFilters).map((key) => ({
        name: key,
        value: key,
      })),
    },
  ],
};
export function execute(interaction, queue) {
  const filter = interaction.options.getString("filter", true);
  const filters = queue.filters;

  if (filters.has(filter)) filters.remove(filter);
  else filters.add(filter);

  return interaction.reply({
    embeds: [
      Embeds.Info(`Current filter: \`${filters.names.join(", ") || "Off"}\``),
    ],
  });
}
