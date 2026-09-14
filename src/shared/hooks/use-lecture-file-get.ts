import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import LectureFileService from "api/rest/lecture-file-service";
import LectureHomeworkFileService from "api/rest/lecture-homework-file-service";
import { Maybe } from "api/graphql/generated/graphql";
import { lectureFileGetKind } from "shared/helpers";

export const useLectureFileGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const getLectureFile = async (
    lectureId: string,
    fileId: string,
    homeWork?: boolean | null
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response =
        lectureFileGetKind(homeWork) === "homework"
          ? await LectureHomeworkFileService.getFile(lectureId, fileId)
          : await LectureFileService.getFile(lectureId, fileId);

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
