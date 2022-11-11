import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { IGetTraining } from "./GetTraining.types";
import { TrainingByIdDocument } from "../../../../generated/graphql";
import { Typography } from "@mui/material";

const GetTraining: React.FC<IGetTraining> = ({ idTraining }) => {
  const [training, { data }] = useLazyQuery(TrainingByIdDocument);

  useEffect(() => {
    training({
      variables: { id: idTraining },
    });
  }, [idTraining]);

  return (
    <LayoutOnCenter>
      <Typography align="center" variant="h4" component="h4">
        {data?.training?.name}
      </Typography>
      <Typography align="center" variant="h4" component="h4">
        {data?.training?.techStack}
      </Typography>
    </LayoutOnCenter>
  );
};
export default GetTraining;
