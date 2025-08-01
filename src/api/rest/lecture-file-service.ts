import axios, { type AxiosResponse } from "axios";
import {
  LECTURE_FILE_UPLOAD_URI,
  LECTURE_FILE_GET_URI,
  LECTURE_FILE_DELETE_URI,
} from "config";

import { createUrlWithParams } from "shared/utils";

export interface LectureFileResponse {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  creationDate: string;
}

export default class LectureFileService {
  static uploadFile(
    lectureId: string,
    file: File
  ): Promise<AxiosResponse<LectureFileResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    const uploadFileUrl = createUrlWithParams(LECTURE_FILE_UPLOAD_URI, {
      lectureId,
    });

    return axios({
      method: "POST",
      url: uploadFileUrl,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    });
  }

  static getFile(
    lectureId: string,
    fileId: string
  ): Promise<AxiosResponse<Blob>> {
    const getFileUrl = createUrlWithParams(LECTURE_FILE_GET_URI, {
      lectureId,
      fileId,
    });

    return axios({
      method: "GET",
      url: getFileUrl,
      responseType: "blob",
    });
  }

  static deleteFile(
    lectureId: string,
    fileId: string
  ): Promise<AxiosResponse<void>> {
    const deleteUrl = createUrlWithParams(LECTURE_FILE_DELETE_URI, {
      lectureId,
      fileId,
    });

    return axios({
      method: "DELETE",
      url: deleteUrl,
    });
  }
}
