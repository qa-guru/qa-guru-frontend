import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import LectureFileService from "api/rest/lecture-file-service";
import { Maybe } from "api/graphql/generated/graphql";

export const useLectureFileGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const getLectureFile = async (lectureId: string, fileId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await LectureFileService.getFile(lectureId, fileId);
      setLoading(false);
      enqueueSnackbar(`Файл успешно загружен`, {
        variant: "success",
      });
      return response.data;
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось получить файл`, { variant: "error" });
      setLoading(false);
      return null;
    }
  };

  return { getLectureFile, loading, error };
};
