import axios, { type AxiosResponse } from "axios";
import {
  HOMEWORK_FILE_DELETE_URI,
  HOMEWORK_FILE_GET_URI,
  HOMEWORK_FILE_UPLOAD_URI,
} from "config";

import { createUrlWithParams } from "shared/utils";

export interface HomeworkFileResponse {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  creationDate: string;
}

export default class HomeworkFileService {
  static uploadFile(
    homeWorkId: string,
    file: File
  ): Promise<AxiosResponse<HomeworkFileResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    const uploadFileUrl = createUrlWithParams(HOMEWORK_FILE_UPLOAD_URI, {
      homeWorkId,
    });

    return axios({
      method: "POST",
      url: uploadFileUrl,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    });
  }

  static getFile(
    homeWorkId: string,
    fileId: string
  ): Promise<AxiosResponse<Blob>> {
    const getFileUrl = createUrlWithParams(HOMEWORK_FILE_GET_URI, {
      homeWorkId,
      fileId,
    });

    return axios({
      method: "GET",
      url: getFileUrl,
      responseType: "blob",
    });
  }

  static deleteFile(
    homeWorkId: string,
    fileId: string
  ): Promise<AxiosResponse<void>> {
    const deleteUrl = createUrlWithParams(HOMEWORK_FILE_DELETE_URI, {
      homeWorkId,
      fileId,
    });

    return axios({
      method: "DELETE",
      url: deleteUrl,
    });
  }
}
