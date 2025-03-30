import { Region, SimpleAuthenticationDetailsProvider } from "oci-common";

import { CreatePreauthenticatedRequestDetails } from "oci-objectstorage/lib/model/create-preauthenticated-request-details";
import { ObjectStorageClient } from "oci-objectstorage";

export type UploadObjectResp = {
  fileName: string;
  filePath: string;
  downloadUrl: string;
};

export class OracleStorageService {
  private objectStorageClient: ObjectStorageClient;
  private namespace: string = process.env.OCI_NAMESPACE as string;
  private bucketName: string = process.env.OCI_BUCKET_NAME as string;
  private bucketUrl: string = process.env.OCI_BUCKET_URL as string;
  private bucketPath: string = "images";

  constructor() {
    const provider = new SimpleAuthenticationDetailsProvider(
      process.env.OCI_TENANCY_OCID as string,
      process.env.OCI_USER_OCID as string,
      process.env.OCI_FINGERPRINT as string,
      Buffer.from(
        process.env.OCI_PRIVATE_KEY_BASE64 ?? "private_key_base64",
        "base64"
      ).toString("utf-8"),
      null,
      Region.AP_TOKYO_1
    );

    this.objectStorageClient = new ObjectStorageClient({
      authenticationDetailsProvider: provider,
    });
  }

  async uploadFile(file: File): Promise<UploadObjectResp> {
    try {
      const fileBuffer = await file.arrayBuffer();
      const objectName = `${this.bucketPath}/${Date.now()}_${file.name}`;

      const uploadDetails = {
        namespaceName: this.namespace,
        bucketName: this.bucketName,
        objectName,
        putObjectBody: Buffer.from(fileBuffer),
      };

      await this.objectStorageClient.putObject(uploadDetails);

      return {
        fileName: file.name,
        filePath: objectName,
        downloadUrl: this.getDownloadPath(objectName),
      };
    } catch (error) {
      console.error("Upload Error:", error);
      throw new Error("Failed to upload file");
    }
  }

  getDownloadPath(objectName: string): string {
    return `${this.bucketUrl}/n/${this.namespace}/b/${this.bucketName}/o/${objectName}`;
  }

  getImagePath(objectName: string): string {
    return `/${this.bucketPath}/${objectName}`;
  }

  async getPreauthenticatedRequest(): Promise<{
    parUrl: string;
    bucketUrl: string;
  }> {
    const par = await this.objectStorageClient.createPreauthenticatedRequest({
      namespaceName: this.namespace,
      bucketName: this.bucketName,
      createPreauthenticatedRequestDetails: {
        name: "test",
        accessType:
          CreatePreauthenticatedRequestDetails.AccessType.AnyObjectReadWrite,
        timeExpires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    return {
      parUrl: `${this.bucketUrl}${par.preauthenticatedRequest.accessUri}`,
      bucketUrl: `${this.bucketUrl}/n/${this.namespace}/b/${this.bucketName}/o`,
    };
  }
}
