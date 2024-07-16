import { useState } from "react";
import AvatarUploadService from "api/rest/avatar-upload-service";
import { enqueueSnackbar } from "notistack";
import { Maybe } from "api/graphql/generated/graphql";
import { client } from "api";

import { RESPONSE_STATUS } from "../constants";

export const useAvatarUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Maybe<Error>>(null);

  const uploadAvatar = async (file: string | File) => {
    setUploading(true);
    setError(null);
    try {
      const response = await AvatarUploadService.upload(file);
      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setUploading(false);
        client.refetchQueries({ include: ["user"] });
        enqueueSnackbar(`Изображение успешно загрузилось`, {
          variant: "success",
        });
        return response.data;
      } else {
        setUploading(false);
        enqueueSnackbar(`Не удалось загрузить изображение`);
        return null;
      }
    } catch (err) {
      setError(err as Error);
      enqueueSnackbar(`Не удалось загрузить изображение`);
      setUploading(false);
      return null;
    }
  };

  return { uploadAvatar, uploading, error };
};
