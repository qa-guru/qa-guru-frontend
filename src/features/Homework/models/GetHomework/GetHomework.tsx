import React, { useEffect } from "react";
import { IGetHomework } from "./GetHomework.types";
import { useLazyQuery } from "@apollo/client";
import { LectureHomeWorkByIdDocument } from "../../../../generated/graphql";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { Typography } from "@mui/material";

const GetHomework: React.FC<IGetHomework> = ({ idHomework }) => {
  const [lectureHomeWork, { data }] = useLazyQuery(LectureHomeWorkByIdDocument);

  useEffect(() => {
    lectureHomeWork({
      variables: { id: idHomework },
    });
  }, [idHomework]);

  return (
    <LayoutOnCenter>
      <Typography align="center" variant="h4" component="h4">
        {data?.lectureHomeWork?.subject}
      </Typography>
      <Typography align="center" variant="h4" component="h4">
        {data?.lectureHomeWork?.description}
      </Typography>
    </LayoutOnCenter>
  );
};
export default GetHomework;
