import { Collection, Events } from "discord.js";
import Embeds from "../../utils/Embeds.js";

export const data = {
  name: Events.InteractionCreate,
};
export async function execute(interaction) {
  if (!interaction.inCachedGuild()) return;
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  const command = interaction.client.commands.get(commandName);

  if (!command) {
    return console.error(
      `No command matching \`${interaction.commandName}\` was found.`
    );
  }

  const { cooldowns } = interaction.client;

  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  const defaultCooldownDuration = 3;
  const cooldownAmount =
    (command.data.cooldown ?? defaultCooldownDuration) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const expiredTimestamp = Math.round(expirationTime / 1000);
      return interaction.reply({
        embeds: [
          Embeds.Warning(
            `Please wait, you are on a cooldown for \`${commandName}\` command.
You can use it again <t:${expiredTimestamp}:R>.`
          ),
        ],
        ephemeral: true,
      });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  const queue = interaction.client.distube.getQueue(interaction);
  if (commandName !== "play" && !queue) {
    return interaction.reply({
      embeds: [Embeds.Error("I am not playing anything right now!")],
      ephemeral: true,
    });
  }

  const selfChannel = interaction.guild.members.me?.voice.channel;
  const memberChannel = interaction.member.voice.channel;

  if (!selfChannel && !memberChannel) {
    return interaction.reply({
      embeds: [
        Embeds.Warning("You must join a voice channel to use this command!"),
      ],
      ephemeral: true,
    });
  }

  if (selfChannel && selfChannel.id !== memberChannel.id) {
    return interaction.reply({
      embeds: [
        Embeds.Error(
          `You must join ${selfChannel.toString()} channel to use this command.`
        ),
      ],
      ephemeral: true,
    });
  }

  try {
    await command.execute(interaction, queue);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      return interaction.followUp({
        embeds: [
          Embeds.Error("There was an error while executing this command!"),
        ],
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        embeds: [
          Embeds.Error("There was an error while executing this command!"),
        ],
        ephemeral: true,
      });
    }
  }
}
