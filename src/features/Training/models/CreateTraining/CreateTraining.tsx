import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RHF from "../../../../shared/ui/InputRHF";
import { TrainingInput } from "../../../../generated/graphql";
import { useUpdateTrainingMutation } from "../../../../api/graphql/training/updateTraining";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { ICreateTraining } from "./CreateTraining.types";
import styles from "./CreateTraining.module.scss";
import { Button, Typography } from "@mui/material";

const CreateTraining: React.FC<ICreateTraining> = ({ setIdTraining }) => {
  const { handleSubmit, control } = useForm<TrainingInput>({
    defaultValues: {
      name: "",
    },
  });

  const [updateTraining] = useUpdateTrainingMutation();

  const onSubmit: SubmitHandler<TrainingInput> = (data) => {
    updateTraining({
      variables: { input: data },
    }).then((response) => {
      if (response.data?.updateTraining?.id)
        setIdTraining(response.data?.updateTraining?.id);
    });
  };

  return (
    <LayoutOnCenter>
      <form className={styles.form}>
        <Typography align="center" variant="h4" component="h4">
          Create Training
        </Typography>
        <RHF.InputTextField name="name" control={control} label="Name" />
        <RHF.Select
          name="techStack"
          control={control}
          placeholder="Select TechStack"
          content={["JAVA", "PYTHON"]}
          defaultValue=""
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </form>
    </LayoutOnCenter>
  );
};

export default CreateTraining;
