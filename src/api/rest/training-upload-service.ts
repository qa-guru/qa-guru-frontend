import axios, { type AxiosResponse } from "axios";

import { createUrlWithParams } from "shared/utils";

import { TRAINING_DELETE_URI, TRAINING_UPLOAD_URI } from "../../config";

export interface TrainingUploadResponse {
  file: string | File;
}

export default class TrainingUploadService {
  static upload(
    file: string | File,
    trainingId: string
  ): Promise<AxiosResponse<TrainingUploadResponse>> {
    const formData = new FormData();

    formData.append("file", file);

    const uploadUrl = createUrlWithParams(TRAINING_UPLOAD_URI, {
      id: trainingId,
    });

    return axios({
      method: "POST",
      url: uploadUrl,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    });
  }

  static delete(trainingId: string): Promise<AxiosResponse<void>> {
    const deleteUrl = createUrlWithParams(TRAINING_DELETE_URI, {
      id: trainingId,
    });

    return axios({
      method: "DELETE",
      url: deleteUrl,
    });
  }
}
