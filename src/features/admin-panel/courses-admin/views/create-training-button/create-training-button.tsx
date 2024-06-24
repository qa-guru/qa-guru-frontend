import { Stack } from "@mui/material";
import { FC } from "react";
import { app } from "theme/colors";
import AddIcon from "@mui/icons-material/Add";
import {
  TechStack,
  UpdateTrainingMutationFn,
} from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

interface ICreateTrainingButton {
  updateTraining: UpdateTrainingMutationFn;
  loading: boolean;
}

const СreateTrainingButton: FC<ICreateTrainingButton> = ({
  updateTraining,
  loading,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const generateUniqueId = () => {
    return `_${Math.random().toString(36).slice(2, 11)}_${Date.now()}`;
  };

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
        startIcon={<AddIcon />}
        loading={loading}
      >
        Новый курс
      </LoadingButton>
    </Stack>
  );
};

export default СreateTrainingButton;
