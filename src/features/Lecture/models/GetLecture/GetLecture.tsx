import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { LectureByIdDocument } from "../../../../generated/graphql";
import { IGetLecture } from "./GetLecture.types";
import { Typography } from "@mui/material";
import styles from "./GetLecture.module.scss";

const GetLecture: React.FC<IGetLecture> = ({ idLecture }) => {
  const [lecture, { data }] = useLazyQuery(LectureByIdDocument);

  useEffect(() => {
    lecture({
      variables: { id: idLecture },
    });
  }, [idLecture]);

  return (
    <LayoutOnCenter>
      <Typography align="center" variant="h4" component="h4">
        {data?.lecture?.subject}
      </Typography>
      <Typography align="center" variant="h4" component="h4">
        {data?.lecture?.description}
      </Typography>
    </LayoutOnCenter>
  );
};
export default GetLecture;
