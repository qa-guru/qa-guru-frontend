import React, { useEffect, useState } from "react";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { Maybe } from "api/graphql/generated/graphql";

import TrainingCalendar from "../../views/training-calendar";

type TrainingData = Maybe<{
  classes: string[];
}>;

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

  if (loading) return <AppSpinner />;

  if (!data) return <NoDataErrorMessage />;

  return <TrainingCalendar data={data} />;
};

export default TrainingCalendarContainer;
