import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Badge, Box } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  // eslint-disable-next-line import/named
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { ITrainingCalendar } from "./training-calendar.types";

const TrainingCalendar: React.FC<ITrainingCalendar> = ({ data }) => {
  const highlightedDates = data.classes.map((date) => dayjs(date));

  function isHighlighted(day: Dayjs) {
    return highlightedDates.some((highlightedDay) =>
      highlightedDay.isSame(day, "day")
    );
  }

  function ServerDay(props: PickersDayProps<Dayjs>) {
    const { day, outsideCurrentMonth, ...other } = props;
    const isSelected = !outsideCurrentMonth && isHighlighted(day);

    return (
      <Badge
        key={day.toString()}
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

  return (
    <Box sx={{ position: "absolute" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default TrainingCalendar;
