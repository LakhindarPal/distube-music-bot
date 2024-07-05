import { Events } from "distube";

export const data = {
  name: Events.FFMPEG_DEBUG,
  type: "distube",
};

export function execute(message) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}
