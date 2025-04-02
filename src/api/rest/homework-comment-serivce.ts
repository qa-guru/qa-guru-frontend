import axios, { type AxiosResponse } from "axios";
import {
  HOMEWORK_COMMENT_FILE_UPLOAD_URI,
  HOMEWORK_COMMENT_FILE_GET_URI,
  HOMEWORK_COMMENT_FILE_DELETE_URI,
} from "config";

import { createUrlWithParams } from "shared/utils";

export interface HomeworkFileResponse {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  creationDate: string;
}

export default class HomeworkCommentFileService {
  static uploadFile(
    commentId: string,
    file: File
  ): Promise<AxiosResponse<HomeworkFileResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    const uploadFileUrl = createUrlWithParams(
      HOMEWORK_COMMENT_FILE_UPLOAD_URI,
      {
        commentId,
      }
    );

    return axios({
      method: "POST",
      url: uploadFileUrl,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    });
  }

  static getFile(
    commentId: string,
    fileId: string
  ): Promise<AxiosResponse<Blob>> {
    const getFileUrl = createUrlWithParams(HOMEWORK_COMMENT_FILE_GET_URI, {
      commentId,
      fileId,
    });

    return axios({
      method: "GET",
      url: getFileUrl,
      responseType: "blob",
    });
  }

  static deleteFile(
    commentId: string,
    fileId: string
  ): Promise<AxiosResponse<void>> {
    const deleteUrl = createUrlWithParams(HOMEWORK_COMMENT_FILE_DELETE_URI, {
      commentId,
      fileId,
    });

    return axios({
      method: "DELETE",
      url: deleteUrl,
    });
  }
}
