import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import HomeworkCommentFileService from "api/rest/homework-comment-serivce";
import { Maybe } from "api/graphql/generated/graphql";
import { RESPONSE_STATUS } from "shared/constants";

export const useHomeworkCommentFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadHomeworkCommentFile = async (file: File, commentId: string) => {
    setUploading(true);
    setError(null);

    try {
      const response = await HomeworkCommentFileService.uploadFile(
        commentId,
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

  return { uploadHomeworkCommentFile, uploading, error };
};
