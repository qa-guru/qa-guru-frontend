import { FC, useEffect, useRef, useState } from "react";
import { Badge, Box, Container, Grid, Typography } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  type PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { ITrainings } from "./training-purchases.types";
import {
  StyledBox,
  StyledCardActionArea,
  StyledGrid,
  StyledLink,
  StyledPaper,
  StyledTypography,
} from "./training-purchases.styled";
import { white } from "../../../theme/colors";

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2022-04-17");

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing={2} sx={{ position: "relative" }}>
        {trainingPurchases?.map((item, index) => {
          const { id, name } = item?.trainingTariff.training || {};
          const [showCalendar, setShowCalendar] = useState(false);

          return (
            <Grid
              item
              key={index}
              xs={12}
              md={6}
              onMouseEnter={() => setShowCalendar(true)}
              onMouseLeave={() => setShowCalendar(false)}
            >
              <StyledLink to={`/training/${id}`}>
                <StyledCardActionArea>
                  <StyledPaper>
                    <Typography variant="h5">{name}</Typography>
                    <StyledBox>
                      <StyledTypography variant="body2">
                        Продолжить
                      </StyledTypography>
                    </StyledBox>
                  </StyledPaper>
                </StyledCardActionArea>
              </StyledLink>
              {showCalendar && (
                <Box
                  onMouseEnter={() => setShowCalendar(true)}
                  onMouseLeave={() => setShowCalendar(false)}
                  sx={{ position: "absolute", backgroundColor: white }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      defaultValue={initialValue}
                      loading={isLoading}
                      onMonthChange={handleMonthChange}
                      renderLoading={() => <DayCalendarSkeleton />}
                      slots={{
                        day: ServerDay,
                      }}
                      slotProps={{
                        day: {
                          highlightedDays,
                        } as any,
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
