function checkEnv() {
  if (!process.env["DISCORD_TOKEN"]) {
    throw new Error(
      "[ENV]: 'DISCORD_TOKEN' is missing. Bot will not function without it."
    );
  }

  if (!process.env.DEV_GUILD) {
    console.error(
      "Environment",
      "'DEV_GUILD' is required to register developer-only commands."
    );
  }

  if (!process.env.DEV_IDS) {
    console.error(
      "Environment",
      "'DEV_IDS' is required to use developer-only commands."
    );
  }
}

checkEnv();
