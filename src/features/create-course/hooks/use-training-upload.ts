import { useState } from "react";
import TrainingUploadService from "api/rest/training-upload-service";
import { enqueueSnackbar } from "notistack";
import { Maybe } from "api/graphql/generated/graphql";
import { client } from "api";

import { RESPONSE_STATUS } from "../constants";

export const useTrainingUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadTraining = async (file: string | File, id: string) => {
    setUploading(true);
    setError(null);
    try {
      const response = await TrainingUploadService.upload(file, id);
      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setUploading(false);
        client.refetchQueries({ include: ["user"] });
        enqueueSnackbar(`Изображение успешно загрузилось`, {
          variant: "success",
        });
        return response.data;
      } else {
        setUploading(false);
        enqueueSnackbar(`Не удалось загрузить изображение`);
        return null;
      }
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось загрузить изображение`);
      setUploading(false);
      return null;
    }
  };

  return { uploadTraining, uploading, error };
};
