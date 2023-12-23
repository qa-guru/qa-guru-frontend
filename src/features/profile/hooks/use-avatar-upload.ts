import { useState } from "react";
import AvatarUploadService from "api/rest/avatar-upload-service";
import { enqueueSnackbar } from "notistack";

import { RESPONSE_STATUS } from "../constants";

export const useAvatarUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const response = await AvatarUploadService.upload(file);
      if (response.status === RESPONSE_STATUS.SUCCESSFUL) {
        setUploading(false);
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
