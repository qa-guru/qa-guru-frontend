import React from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import { ILectureDetail } from "./LectureDetail.types";
import LectureHomework from "./LectureHomework";
import Homework from "./Homework";
import useTariff from "../../hooks/useTariff";

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const { dataLecture, dataHomeWorkByLecture, dataLectureHomework } = props;
  const { subject, description, speakers, content } = dataLecture.lecture!;
  const { trainingId } = useParams();
  const { hasTariffHomework } = useTariff({ trainingId });

  return (
    <>
      <LectureTitle title={subject!} />
      <LectureDescription description={description!} />
      <LectureSpeakers speakers={speakers!} />
      <LectureContent content={content!} />
      {hasTariffHomework ? (
        <>
          {dataLectureHomework && (
            <>
              <LectureHomework dataLectureHomework={dataLectureHomework} />
              <Homework dataHomeWorkByLecture={dataHomeWorkByLecture} />
            </>
          )}
        </>
      ) : (
        <Box mt="25px">
          <Button variant="contained">Купить тариф с домашним заданием</Button>
        </Box>
      )}
    </>
  );
};

export default LectureDetail;
