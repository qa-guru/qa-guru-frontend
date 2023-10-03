import React from "react";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { IHomeworkDescriptionFullpage } from "./homework-description-fullpage.types";
import { StyledBox } from "./homework-description-fullpage.styled";

const HomeworkDescriptionFullpage: React.FC<IHomeworkDescriptionFullpage> = ({
  data,
}) => {
  const navigate = useNavigate();

  console.log(data);

  const handleBack = () => {
    navigate(`/kanban`);
  };

  return (
    <Box>
      <StyledBox>
        <Button onClick={handleBack} variant="contained">
          Назад <ChevronRightIcon />
        </Button>
      </StyledBox>
      {/*<Typography variant="h6">{getFormattedId(lectureId!)}</Typography>*/}
    </Box>
  );
};

export default HomeworkDescriptionFullpage;
