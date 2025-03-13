import { CreateVideo } from "@/app/services/video.service";
import HttpRequest from "@/utils/httpRequest";

export const createVideo = async (params: CreateVideo) => {
  const response = await HttpRequest.post('/api/video', params);
  return response.data;
};


