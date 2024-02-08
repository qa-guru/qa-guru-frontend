import axios, { type AxiosResponse } from "axios";

import { AVATAR_UPLOAD_URI, AVATAR_DELETE_URI } from "../../config";

export interface AvatarUploadResponse {
  file: File;
}

export default class AvatarUploadService {
  static upload(file: File): Promise<AxiosResponse<AvatarUploadResponse>> {
    const formData = new FormData();

    formData.append("file", file);

    return axios({
      method: "POST",
      url: AVATAR_UPLOAD_URI,
      headers: { "content-type": "multipart/form-data" },
      data: formData,
    });
  }

  static delete(): Promise<AxiosResponse<void>> {
    return axios.delete(AVATAR_DELETE_URI, {
      method: "DELETE",
    });
  }
}
