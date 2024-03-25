import { FC } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useHomeworksForm } from "../../context/homeworks-other-students-form-context";
import StatusSelection from "../status-selection";
import SortByCreationDate from "../sort-by-creation-date";
import {
  StyledIconButton,
  StyledWrapper,
} from "./homeworks-other-students-form.styled";

const HomeworksOtherStudentsForm: FC = () => {
  const { control, reset } = useForm({
    defaultValues: {
      status: "",
      creationDate: "",
    },
  });

  const { setSortOrder, setStatus } = useHomeworksForm();

  const handleReset = () => {
    setSortOrder(null);
    setStatus(null);
    reset();
  };

  return (
    <form>
      <StyledWrapper>
        <StatusSelection control={control} />
        <SortByCreationDate control={control} />
        <Box>
          <StyledIconButton onClick={handleReset}>
            <RefreshIcon color={"primary"} fontSize={"medium"} />
          </StyledIconButton>
        </Box>
      </StyledWrapper>
    </form>
  );
};

export default HomeworksOtherStudentsForm;
