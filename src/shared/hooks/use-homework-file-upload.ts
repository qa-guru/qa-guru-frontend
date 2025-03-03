import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Maybe } from "api/graphql/generated/graphql";
import HomeworkFileService from "api/rest/homework-file-service";
import { RESPONSE_STATUS } from "shared/constants";

export const useHomeworkFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadHomeworkFile = async (file: File, homeWorkId: string) => {
    setUploading(true);
    setError(null);

    try {
      const response = await HomeworkFileService.uploadFile(homeWorkId, file);

      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setUploading(false);
        enqueueSnackbar(`Файл успешно загружен`, {
          variant: "success",
        });
        return response.data;
      } else {
        setUploading(false);
        enqueueSnackbar(`Не удалось загрузить файл`);
        return null;
      }
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось загрузить файл`);
      setUploading(false);
      return null;
    }
  };

  return { uploadHomeworkFile, uploading, error };
};
