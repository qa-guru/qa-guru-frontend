import { FC } from "react";
import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { app } from "theme/colors";
import { useLocation, useNavigate } from "react-router-dom";

import Trainings from "../../containers/trainings";

const CoursesAdmin: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateCreateCourse = () => {
    navigate(`${location.pathname}/create-training`);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" />
        <Button
          onClick={handleNavigateCreateCourse}
          sx={{ color: app.white }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Новый курс
        </Button>
      </Stack>

      <Trainings />
    </>
  );
};

export default CoursesAdmin;
