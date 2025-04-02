import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Maybe } from "api/graphql/generated/graphql";
import { RESPONSE_STATUS } from "shared/constants";
import HomeworkCommentFileService from "api/rest/homework-comment-serivce";

export const useHomeworkCommentFileDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const deleteHomeworkCommentFile = async (
    commentId: string,
    fileId: string
  ) => {
    setDeleting(true);
    setError(null);

    try {
      const response = await HomeworkCommentFileService.deleteFile(
        commentId,
        fileId
      );

      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setDeleting(false);
        enqueueSnackbar(`Файл успешно удален`, {
          variant: "success",
        });
        return response.data;
      } else {
        setDeleting(false);
        enqueueSnackbar(`Не удалось удалить файл`);
        return null;
      }
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось удалить файл`);
      setDeleting(false);
      return null;
    }
  };

  return { deleteHomeworkCommentFile, deleting, error };
};
