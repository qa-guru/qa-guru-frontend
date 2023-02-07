import React from "react";
import { CardActionArea, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ITrainingLectures } from "./TrainingLectures.types";
import { primary, white } from "../../../theme/colors";

const style = {
  link: { textDecoration: "none" },
  paper: { padding: "24px 24px 15px 24px" },
  circle: {
    width: "40px",
    height: "40px",
    bgcolor: primary.main,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: white.main,
  },
};

const mockDescription = [
  {
    id: "1",
    value: "Git - самые основы",
  },
  {
    id: "2",
    value: "Теория: Gradle, JUnit5, Selenide.",
  },
  {
    id: "3",
    value: "Практика. Работаем с тренажером demoqa.com",
  },
  {
    id: "4",
    value: "Рассмотрим подробнее возможности Selenide и CSS/Xpath-селекторы",
  },
];

const TrainingLectures: React.FC<ITrainingLectures> = ({
  data,
  trainingId,
}) => {
  return (
    <Grid container spacing={2}>
      {data?.trainingLectures?.map((item, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Link
              style={style.link}
              to={`/training/${trainingId}/${item?.lecture?.id}`}
            >
              <CardActionArea>
                <Paper sx={style.paper}>
                  <Typography variant="h6">{item?.lecture?.subject}</Typography>
                  <Stack spacing={1.5}>
                    {mockDescription?.map((item) => {
                      const { id, value } = item;

                      return (
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          key={id}
                          mt="16px"
                        >
                          <Typography sx={style.circle} variant="subtitle2">
                            {id}
                          </Typography>
                          <Typography variant="subtitle1">{value}</Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Typography color="primary" variant="subtitle2" align="right">
                    Продолжить
                  </Typography>
                </Paper>
              </CardActionArea>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TrainingLectures;
