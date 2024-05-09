import { useState } from "react";
import TrainingUploadService from "api/rest/training-upload-service";
import { enqueueSnackbar } from "notistack";
import { Maybe } from "api/graphql/generated/graphql";
import { client } from "api";

import { RESPONSE_STATUS } from "../constants";

export const useTrainingDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const deleteTraining = async (id: string) => {
    setDeleting(true);
    setError(null);
    try {
      const response = await TrainingUploadService.delete(id);
      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setDeleting(false);
        client.refetchQueries({ include: ["user"] });
        enqueueSnackbar(`Изображение успешно удалено`, {
          variant: "success",
        });
        return response.data;
      } else {
        setDeleting(false);
        enqueueSnackbar(`Не удалось удалить изображение`);
        return null;
      }
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось удалить изображение`);
      setDeleting(false);
      return null;
    }
  };

  return { deleteTraining, deleting, error };
};
