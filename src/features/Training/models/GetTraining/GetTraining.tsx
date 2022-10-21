import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { Typography } from "antd";
import styles from "./GetTraining.module.scss";
import { IGetTraining } from "./GetTraining.types";
import { TrainingByIdDocument } from "../../../../generated/graphql";

const GetTraining: React.FC<IGetTraining> = ({ idTraining }) => {
  const [training, { data }] = useLazyQuery(TrainingByIdDocument);

  useEffect(() => {
    training({
      variables: { id: idTraining },
    }).then((res) => console.log(res));
  }, [idTraining]);

  return (
    <LayoutOnCenter>
      <Typography className={styles.title}>
        {data?.training && data.training.name}
      </Typography>
      <Typography className={styles.subtitle}>
        {data?.training && data.training.techStack}
      </Typography>
    </LayoutOnCenter>
  );
};
export default GetTraining;
