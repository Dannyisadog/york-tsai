import { VideoPageContent } from "@/components/VideoPageContent";
import { getVideo } from "@/app/services/video.service";

interface VideoPageProps {
  params: Promise<{ video_type: string; slug: string }>;
}

export default async function VideoPage(props: VideoPageProps) {
  const { slug } = await props.params;
  const videoId = slug[0];

  // Prevent API routes from being handled here
  if (videoId === "api") {
    return null;
  }

  const videoData = await getVideo(videoId);

  return <VideoPageContent videoData={videoData} />;
}
