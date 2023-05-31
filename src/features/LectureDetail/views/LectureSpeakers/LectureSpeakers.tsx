import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { ILectureSpeakers } from "./LectureSpeakers.types";
import { style } from "./styles";
import AvatarCustom from "../../../../shared/AvatarCustom";

const LectureSpeakers: React.FC<ILectureSpeakers> = (props) => {
  const { speakers } = props;

  return (
    <>
      <Typography mb="15px" pt="30px" variant="h4">
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
              <AvatarCustom width={70} height={70} fullName={fullName} />
              <Box sx={style.box}>
                <Typography variant="subtitle2">{fullName}</Typography>
              </Box>
            </Stack>
          );
        })}
      </Grid>
    </>
  );
};

export default LectureSpeakers;
