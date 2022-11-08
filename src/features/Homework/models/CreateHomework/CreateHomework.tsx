import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateLectureHomeWorkMutation } from "../../../../api/mutation/updateLectureHomework";
import { LectureHomeWorkInput } from "../../../../generated/graphql";
import RHF from "../../../../shared/ui/InputRHF";
import { ICreateHomeWork } from "./CreateHomework.types";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { Button, Typography } from "@mui/material";
import styles from "./CreateHomework.module.scss";

const CreateHomework: React.FC<ICreateHomeWork> = ({ setIdHomework }) => {
  const { handleSubmit, control } = useForm<LectureHomeWorkInput>({
    defaultValues: {
      subject: "",
      description: "",
    },
  });
  const [updateLectureHomeWork] = useUpdateLectureHomeWorkMutation();

  const onSubmit: SubmitHandler<LectureHomeWorkInput> = (data) => {
    updateLectureHomeWork({
      variables: { input: data },
    }).then((response) => {
      if (response.data?.updateLectureHomeWork?.id)
        setIdHomework(response.data?.updateLectureHomeWork?.id);
    });
  };

  return (
    <LayoutOnCenter>
      <form className={styles.form}>
        <Typography align="center" variant="h4" component="h4">
          Create Homework
        </Typography>
        <RHF.InputTextField name="subject" control={control} label="Subject" />
        <RHF.InputTextField
          name="description"
          control={control}
          label="Description"
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </form>
    </LayoutOnCenter>
  );
};

export default CreateHomework;
