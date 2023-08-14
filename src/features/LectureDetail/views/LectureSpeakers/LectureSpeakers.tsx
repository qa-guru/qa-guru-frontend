import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { ILectureSpeakers } from "./LectureSpeakers.types";
import { style } from "./styles";
import AvatarCustom from "../../../../shared/components/AvatarCustom";

const LectureSpeakers: React.FC<ILectureSpeakers> = (props) => {
  const { speakers } = props;

  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb="14px" variant="h5">
          Спикеры
        </Typography>
        <Grid container gap={2}>
          {speakers?.map((item, index) => {
            const { firstName, lastName } = item!;
            const fullName = `${firstName} ${lastName}`;

            return (
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                key={index}
                sx={style.stack}
              >
                <AvatarCustom width={60} height={60} fullName={fullName} />
                <Box sx={style.box}>
                  <Typography variant="subtitle2">{fullName}</Typography>
                </Box>
              </Stack>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};

export default LectureSpeakers;
