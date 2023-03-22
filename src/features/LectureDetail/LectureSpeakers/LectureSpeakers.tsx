import React from "react";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { ILectureSpeakers } from "./LectureSpeakers.types";
import { grey } from "../../../theme/colors";

const style = {
  stack: {
    borderRadius: "16px",
    border: 1,
    padding: "10px 30px 10px 10px",
    borderColor: grey.main,
    width: "min-content",
  },
  avatar: {
    width: 70,
    height: 70,
  },
  box: {
    width: "max-content",
    ml: "16px",
  },
};

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

          return (
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              key={index}
              sx={style.stack}
            >
              <Avatar
                sx={style.avatar}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Box sx={style.box}>
                <Typography variant="subtitle2">
                  {firstName} {lastName}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Grid>
    </>
  );
};

export default LectureSpeakers;
