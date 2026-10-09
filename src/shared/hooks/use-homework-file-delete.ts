import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import HomeworkFileService from "api/rest/homework-file-service";
import { Maybe } from "api/graphql/generated/graphql";
import { RESPONSE_STATUS } from "shared/constants";

export const useHomeworkFileDelete = (
  options: { propagateErrors?: boolean } = {}
) => {
  const { propagateErrors = false } = options;
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const deleteHomeworkFile = async (homeWorkId: string, fileId: string) => {
    setDeleting(true);
    setError(null);

    try {
      const response = await HomeworkFileService.deleteFile(homeWorkId, fileId);
      setDeleting(false);

      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        return response.data;
      }

      throw Object.assign(new Error("Homework file delete failed"), {
        response,
      });
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось удалить файл`);
      setDeleting(false);
      if (propagateErrors) throw err;
      return null;
    }
  };

  return { deleteHomeworkFile, deleting, error };
};
