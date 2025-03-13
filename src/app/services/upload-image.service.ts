import { OracleStorageService, UploadObjectResp } from "./oracle-object-storage.service";

export const uploadImage = async (image: File): Promise<UploadObjectResp> => {
  const oracleStorageService = new OracleStorageService();
  const uploadObjectResp = await oracleStorageService.uploadFile(image);
  return uploadObjectResp;
}