import React from "react";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";

interface ILectureSpeakers {
  speakers: Array<{
    __typename?: "UserDto";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
  } | null> | null;
}

const LectureSpeakers: React.FC<ILectureSpeakers> = (props) => {
  const { speakers } = props;

  return (
    <>
      <Typography pt="40px" variant="h2">
        Спикеры
      </Typography>
      <Grid container gap={2}>
        {speakers?.map((item, index) => {
          return (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              minWidth="270px"
              sx={{
                borderRadius: "16px",
                border: 1,
                borderColor: "#CAC4D0",
                width: "min-content",
                padding: "10px 30px 10px 10px",
              }}
            >
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Box width="max-content" ml="16px">
                <Typography variant="h4">
                  {item?.firstName} {item?.lastName}
                </Typography>
                <Typography mt="4px" variant="subtitle2">
                  Student
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
