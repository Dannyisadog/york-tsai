export const uploadImage = async (par: string, file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const url = `${par}${fileName}`;

  const response = await fetch(url, {
    method: "PUT",
    body: await file.arrayBuffer(), // 直接傳遞 binary data
    headers: {
      "Content-Type": file.type, // 設定正確的 Content-Type
      "Content-Length": file.size.toString(),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  const encodedFileName = encodeURIComponent(fileName);
  return encodedFileName;
};
