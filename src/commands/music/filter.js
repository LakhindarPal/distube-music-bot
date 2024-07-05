import { ApplicationCommandOptionType } from "discord.js";
import { defaultFilters } from "distube";
import { BaseEmbed, ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "filter",
  description: "Manage audio filters",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "toggle",
      description: "Toggle an audio filter",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "filter",
          description: "Select the filter",
          required: true,
          choices: Object.keys(defaultFilters).map((key) => ({
            name: key,
            value: key,
          })),
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "clear",
      description: "Clear all enabled audio filters",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "status",
      description: "Show the status of all filters",
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const subcmd = interaction.options.getSubcommand();
  const filters = queue.filters;

  switch (subcmd) {
    case "toggle":
      {
        const filter = interaction.options.getString("filter", true);

        if (filters.has(filter)) {
          filters.remove(filter);
          interaction.reply({
            embeds: [SuccessEmbed(`Disabled the ${filter} filter.`)],
          });
        } else {
          filters.add(filter);
          interaction.reply({
            embeds: [SuccessEmbed(`Enabled the ${filter} filter.`)],
          });
        }
      }
      break;

    case "clear":
      {
        if (!filters.size) {
          return interaction.reply({
            ephemeral: true,
            embeds: [ErrorEmbed("No audio filters are enabled.")],
          });
        }

        filters.clear();

        interaction.reply({
          embeds: [SuccessEmbed("Cleared all audio filters.")],
        });
      }
      break;

    // case "status":
    default:
      {
        const formatStatus = (filterNames, status) =>
          filterNames.map((name) => `${name} --> ${status}`).join("\n");

        const enabledFilters = filters.names;
        const disabledFilters = Object.keys(defaultFilters).filter(
          (name) => !enabledFilters.includes(name)
        );

        const enabledFiltersDesc = formatStatus(enabledFilters, "✅");
        const disabledFiltersDesc = formatStatus(disabledFilters, "❌");

        const embed = BaseEmbed()
          .setTitle("All Audio Filters")
          .setDescription(`${enabledFiltersDesc}\n\n${disabledFiltersDesc}`);

        interaction.reply({ ephemeral: true, embeds: [embed] });
      }
      break;
  }
}
