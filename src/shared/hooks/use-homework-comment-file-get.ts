import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import HomeworkCommentFileService from "api/rest/homework-comment-serivce";
import { Maybe } from "api/graphql/generated/graphql";

export const useHomeworkCommentFileGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const getHomeworkCommentFile = async (commentId: string, fileId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await HomeworkCommentFileService.getFile(
        commentId,
        fileId
      );
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

  return { getHomeworkCommentFile, loading, error };
};
