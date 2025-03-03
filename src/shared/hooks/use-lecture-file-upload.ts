import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Maybe } from "api/graphql/generated/graphql";
import LectureFileService from "api/rest/lecture-file-service";
import { RESPONSE_STATUS } from "shared/constants";

export const useLectureFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadLectureFile = async (file: File, lectureId: string) => {
    setUploading(true);
    setError(null);

    try {
      const response = await LectureFileService.uploadFile(lectureId, file);

      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setUploading(false);
        enqueueSnackbar(`Файл успешно загружен`, {
          variant: "success",
        });
        return response.data;
      } else {
        setUploading(false);
        enqueueSnackbar(`Не удалось загрузить файл`, { variant: "error" });
        return null;
      }
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось загрузить файл`, { variant: "error" });
      setUploading(false);
      return null;
    }
  };

  return { uploadLectureFile, uploading, error };
};
