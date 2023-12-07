import React, { useEffect, useState } from "react";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import TrainingCalendar from "../../views/training-calendar";

type TrainingData = {
  classes: string[];
} | null;

const TrainingCalendarContainer: React.FC = () => {
  const [data, setData] = useState<TrainingData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData({
      classes: [
        "2023-12-07",
        "2023-12-09",
        "2023-12-13",
        "2023-12-22",
        "2024-01-02",
        "2024-01-13",
      ],
    });
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  if (!data) return <NoDataErrorMessage />;

  return <TrainingCalendar data={data} />;
};

export default TrainingCalendarContainer;
