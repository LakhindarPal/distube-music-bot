import {
  ActivityType,
  ApplicationCommandType,
  Events,
  PresenceUpdateStatus,
} from "discord.js";
import { loadCommands } from "../../handlers/command.js";

export const data = {
  name: Events.ClientReady,
  once: true,
};
export async function execute(client) {
  await loadCommands(client);

  client.user.setPresence({
    activities: [{ name: "/help", type: ActivityType.Listening }],
    status: PresenceUpdateStatus.Online,
  });

  if (process.env.REGISTER_COMMANDS === "true") {
    const commands = client.commands.map(({ data: cmd }) => ({
      type: ApplicationCommandType.ChatInput,
      name: cmd.name,
      description: cmd.description,
      options: cmd.options,
    }));
    await client.application?.commands.set(commands);
  }

  console.log(`Ready! Logged in as ${client.user.tag}`);
}
