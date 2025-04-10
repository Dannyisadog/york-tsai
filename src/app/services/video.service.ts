import {
  Prisma,
  PrismaClient,
  Video,
  VideoImage,
  VideoType,
} from "@prisma/client";

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
};

type VideoWithImages = Prisma.VideoGetPayload<{
  include: {
    images: true;
  };
}>;

export const getVideo = async (id: string): Promise<VideoWithImages> => {
  const video = await prisma.video.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });

  if (!video) {
    throw new Error("Video not found");
  }

  video.images.sort((a, b) => a.order - b.order);
  return video;
};

export interface CreateVideo {
  title: string;
  description: string;
  youtubeLink: string;
  coverImage: string;
  videoType: VideoType;
  relatedImages: Array<{
    url: string;
    order: number;
  }>;
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

  await Promise.all(
    params.relatedImages.map(async (image) => {
      return await createVideoImage({
        video_id: createdVideo.id,
        image_url: image.url,
        order: image.order,
      });
    })
  );
  return createdVideo;
};

interface CreateVideoImage {
  video_id: string;
  image_url: string;
  order: number;
}

export const createVideoImage = async (
  data: CreateVideoImage
): Promise<VideoImage> => {
  const createdVideoImage = await prisma.videoImage.create({
    data,
  });
  return createdVideoImage;
};

export interface UpdateVideo {
  title: string;
  description: string;
  youtubeLink: string;
  coverImage: string;
  videoType: VideoType;
  relatedImages: Array<{
    url: string;
    order: number;
  }>;
}

export const updateVideo = async (
  id: string,
  video: UpdateVideo
): Promise<Video> => {
  // First update the video
  const updatedVideo = await prisma.video.update({
    where: { id },
    data: {
      title: video.title,
      description: video.description,
      youtube_link: video.youtubeLink,
      cover_image: video.coverImage,
      video_type: video.videoType,
    },
  });

  // Delete existing images
  await prisma.videoImage.deleteMany({
    where: { video_id: id },
  });

  // Create new images
  await Promise.all(
    video.relatedImages.map(async (image) => {
      return await createVideoImage({
        video_id: id,
        image_url: image.url,
        order: image.order,
      });
    })
  );

  return updatedVideo;
};

export const deleteVideo = async (id: string): Promise<void> => {
  await prisma.video.update({
    where: { id },
    data: { is_deleted: true },
  });
};
