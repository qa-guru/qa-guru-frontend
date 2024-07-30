import { FC } from "react";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

import { app } from "theme/colors";
import {
  TechStack,
  UpdateTrainingMutationFn,
} from "api/graphql/generated/graphql";
import { generateUniqueId } from "shared/helpers";

interface ICreateTrainingButton {
  updateTraining: UpdateTrainingMutationFn;
  loading: boolean;
}

const СreateTrainingButton: FC<ICreateTrainingButton> = ({
  updateTraining,
  loading,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateCourse = () => {
    const courseName = `Курс ${generateUniqueId()}`;

    updateTraining({
      variables: {
        input: {
          name: courseName,
          techStack: TechStack.Python,
        },
      },
      onCompleted: () => {
        enqueueSnackbar("Курс создан", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar(
          "Не удалось создать курс. Пожалуйста, попробуйте снова",
          { variant: "error" }
        );
      },
    });
  };

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center">
      <LoadingButton
        onClick={handleCreateCourse}
        sx={{ color: app.white }}
        variant="contained"
        startIcon={<Add />}
        loading={loading}
      >
        Новый курс
      </LoadingButton>
    </Stack>
  );
};

export default СreateTrainingButton;
