import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Maybe } from "api/graphql/generated/graphql";
import HomeworkFileService from "api/rest/homework-file-service";
import { RESPONSE_STATUS } from "shared/constants";

export const useHomeworkFileUpload = (
  options: { propagateErrors?: boolean } = {}
) => {
  const { propagateErrors = false } = options;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadHomeworkFile = async (file: File, homeWorkId: string) => {
    setUploading(true);
    setError(null);

    try {
      const response = await HomeworkFileService.uploadFile(homeWorkId, file);
      setUploading(false);

      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        return response.data;
      }

      throw Object.assign(new Error("Homework file upload failed"), {
        response,
      });
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось загрузить файл`);
      setUploading(false);
      if (propagateErrors) throw err;
      return null;
    }
  };

  return { uploadHomeworkFile, uploading, error };
};
