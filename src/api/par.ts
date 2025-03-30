import HttpRequest from "@/utils/httpRequest";

export const getPar = async (): Promise<{
  parUrl: string;
  bucketUrl: string;
}> => {
  const response = await HttpRequest.get("/api/par");
  return response.data as {
    parUrl: string;
    bucketUrl: string;
  };
};
