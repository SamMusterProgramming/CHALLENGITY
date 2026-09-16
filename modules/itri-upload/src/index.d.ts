declare const ItriUpload: {
  getBackgroundTasks(): Promise<
    Array<{
      taskIdentifier: number;
      jobId: string;
      state: number;
      countOfBytesSent: number;
      countOfBytesExpectedToSend: number;
    }>
  >;

  startUpload(
    jobId: string,
    uploadUrl: string,
    authorization: string,
    filePath: string,
    fileName: string,
    contentType: string
  ): Promise<boolean>;

  cancelUpload(
    jobId: string
  ): Promise<boolean>;

  getUploadStatus(
    jobId: string
  ): Promise<string | null>;

  getUploadJobInfo(
    jobId: string
  ): Promise<string>;

  hello(): string;
};

export default ItriUpload;
