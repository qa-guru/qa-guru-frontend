import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { style } from "./styles";
import { IHomeworkDetail } from "./HomeworkDetails.types";
import { getFormattedId } from "../../helpers/getFormattedId";

const HomeworkDetails: React.FC<IHomeworkDetail> = ({ card, onClose }) => {
  return (
    <Box sx={style.menu}>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Grid item>
          <Typography variant="h6">{getFormattedId(card.id!)}</Typography>
        </Grid>
        <Grid item>
          <Button onClick={onClose} variant="contained">
            Свернуть <ChevronRightIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeworkDetails;
