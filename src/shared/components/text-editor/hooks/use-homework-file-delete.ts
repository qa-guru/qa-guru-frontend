import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import HomeworkFileService from "api/rest/homework-file-service";
import { Maybe } from "api/graphql/generated/graphql";
import { RESPONSE_STATUS } from "shared/constants";

export const useHomeworkFileDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const deleteHomeworkFile = async (homeWorkId: string) => {
    setDeleting(true);
    setError(null);

    try {
      const response = await HomeworkFileService.deleteFile(homeWorkId);

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

  return { deleteHomeworkFile, deleting, error };
};
