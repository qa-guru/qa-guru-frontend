import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import HomeworkFileService from "api/rest/homework-file-service";
import { Maybe } from "api/graphql/generated/graphql";

export const useHomeworkFileGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const getHomeworkFile = async (homeWorkId: string, fileId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await HomeworkFileService.getFile(homeWorkId, fileId);
      setLoading(false);
      enqueueSnackbar(`Файл успешно загружен`, {
        variant: "success",
      });
      return response.data;
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось получить файл`);
      setLoading(false);
      return null;
    }
  };

  return { getHomeworkFile, loading, error };
};
