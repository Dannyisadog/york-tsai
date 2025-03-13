import { PrismaClient, Video, VideoImage, VideoType } from "@prisma/client";

const prisma = new PrismaClient();

export const listVideos = async (type: VideoType): Promise<Video[]> => {
  const videos = await prisma.video.findMany({
    where: {
      video_type: type,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return videos;
}

export const getVideo = async (id: string): Promise<Video> => {
  const video = await prisma.video.findUnique({
    where: { id },
  });

  if (!video) {
    throw new Error("Video not found");
  }

  return video;
}

export interface CreateVideo {
  title: string;
  description: string;
  youtubeLink: string;
  coverImage: string;
  videoType: VideoType;
  relatedImages: string[];
}

export const createVideo = async (params: CreateVideo): Promise<Video> => {
  const createdVideo = await prisma.video.create({
    data: {
      title: params.title,
      description: params.description,
      youtube_link: params.youtubeLink,
      cover_image: params.coverImage,
      video_type: params.videoType,
    },
  });
  
  await Promise.all(params.relatedImages.map(async (image) => {
    return await createVideoImage({
      video_id: createdVideo.id,
      image_url: image,
    });
  }));
  return createdVideo;
}

interface CreateVideoImage {
  video_id: string;
  image_url: string;
}

export const createVideoImage = async (data: CreateVideoImage): Promise<VideoImage> => {
  const createdVideoImage = await prisma.videoImage.create({
    data,
  });
  return createdVideoImage;
}

export const updateVideo = async (id: string, video: Video): Promise<Video> => {
  const updatedVideo = await prisma.video.update({
    where: { id },
    data: video,
  });
  return updatedVideo;
}

export const deleteVideo = async (id: string): Promise<void> => {
  await prisma.video.update({
    where: { id },
    data: { is_deleted: true },
  });
}

