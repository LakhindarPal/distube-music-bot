import { Colors, EmbedBuilder } from "discord.js";

class Embeds extends EmbedBuilder {
  /**
   * Creates an error embed.
   * @param {string} data - The description text for the embed.
   * @returns {Embeds} The created embed with red color.
   */
  static Error(data) {
    return Embeds.create(data).setColor(Colors.Red);
  }

  /**
   * Creates a success embed.
   * @param {string} data - The description text for the embed.
   * @returns {Embeds} The created embed with green color.
   */
  static Success(data) {
    return Embeds.create(data).setColor(Colors.Green);
  }

  /**
   * Creates a warning embed.
   * @param {string} data - The description text for the embed.
   * @returns {Embeds} The created embed with dark orange color.
   */
  static Warning(data) {
    return Embeds.create(data).setColor(Colors.DarkOrange);
  }

  /**
   * Creates an informational embed.
   * @param {string} data - The description text for the embed.
   * @returns {Embeds} The created embed with blurple color.
   */
  static Info(data) {
    return Embeds.create(data).setColor(Colors.Blurple);
  }

  static create(data) {
    return new Embeds().setDescription(data);
  }

  constructor(data) {
    super(data);
  }
}

export default Embeds;
