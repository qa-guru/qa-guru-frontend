import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Maybe } from "api/graphql/generated/graphql";
import { RESPONSE_STATUS } from "shared/constants";
import LectureHomeworkFileService from "api/rest/lecture-homework-file-service";

export const useLectureHomeworkFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadLectureHomeworkFile = async (file: File, lectureId: string) => {
    setUploading(true);
    setError(null);

    try {
      const response = await LectureHomeworkFileService.uploadFile(
        lectureId,
        file
      );

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

  return { uploadLectureHomeworkFile, uploading, error };
};
