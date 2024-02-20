import { createRef, FC, RefObject, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserRow from "shared/components/user-row";
import useOutsideClick from "shared/hooks/use-outside-click";

import { ITrainings } from "./training-purchases.types";
import {
  StyledCardActionArea,
  StyledCalendarIcon,
  StyledCourseImg,
  StyledGrid,
  StyledImgBox,
  StyledLoadingButton,
  StyledPaper,
  StyledUserBox,
  StyledCalendarBox,
} from "./training-purchases.styled";
import { TrainingCalendar } from "../../containers";

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;
  const navigate = useNavigate();
  const [openCalendarById, setOpenCalendarById] = useState<string | null>(null);
  const calendarRefs = useRef<{ [key: string]: RefObject<HTMLElement> }>({});
  const gridMdValue =
    trainingPurchases && trainingPurchases.length >= 3 ? 4 : 6;

  const toggleCalendar = (id: string) => {
    if (openCalendarById === id) {
      setOpenCalendarById(null);
    } else {
      setOpenCalendarById(id);
    }
  };

  // очень очень странное место. не useEffect, так еще и динамический массив Ref
  // ... что? обсудить отдельно. очень сложная конструкция
  trainingPurchases?.forEach((item) => {
    const id = item?.trainingTariff.training?.id;
    if (id !== undefined) {
      if (!calendarRefs.current[id]) {
        calendarRefs.current[id] = createRef();
      }
      useOutsideClick(calendarRefs.current[id], () => {
        if (openCalendarById === id) {
          setOpenCalendarById(null);
        }
      });
    }
  });

  const routeTraining = (id: string) => {
    navigate(`/training/${id}`);
  };

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing="30px">
        {/*
        дело вкуса, но я бы этот мап написал так
        trainingPurchases?.map(({trainingTariff: {training: { id, name }}}) => <>other</>
        */}
        {trainingPurchases?.map((item) => {
          const { id, name } = item?.trainingTariff.training || {};

          return (
            <Grid item key={id} xs={12} md={gridMdValue}>
              <StyledCardActionArea>
                <StyledPaper>
                  <StyledImgBox>
                    <StyledCourseImg />
                  </StyledImgBox>
                  <StyledUserBox>
                    <UserRow user={item?.user} userId={item?.user.id} hasLink />
                  </StyledUserBox>
                  <Typography variant="h5">{name}</Typography>
                  <StyledCalendarBox open={openCalendarById === id}>
                    <StyledCalendarIcon
                      onClick={() => toggleCalendar(id!)}
                      open={openCalendarById === id}
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  </StyledCalendarBox>
                  {id && (
                    <Box ref={calendarRefs.current[id]}>
                      {openCalendarById === id && <TrainingCalendar />}
                    </Box>
                  )}
                  <StyledLoadingButton
                    variant="contained"
                    onClick={() => routeTraining(id!)}
                  >
                    Продолжить
                  </StyledLoadingButton>
                </StyledPaper>
              </StyledCardActionArea>
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
