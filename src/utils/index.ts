import { VideoType } from "@prisma/client";

export const convertPathToVideoType = (path: string): VideoType => {
  switch (path) {
    case "commercial":
      return VideoType.Commercial;
    case "music-video":
      return VideoType.MusicVideo;
    case "live-session":
      return VideoType.LiveSession;
    case "concert":
      return VideoType.Concert;
    case "highlight":
      return VideoType.Highlight;
    case "reels-shorts":
      return VideoType.ReelsAndShorts;
  }

  throw new Error("Invalid video type");
};
