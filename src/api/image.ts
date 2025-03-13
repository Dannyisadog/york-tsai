import { UploadObjectResp } from "@/app/services/oracle-object-storage.service";
import HttpRequest from "@/utils/httpRequest";

export const uploadImage = async (file: File): Promise<UploadObjectResp> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await HttpRequest.post('/api/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },  
  });
  return response.data as UploadObjectResp;
};
