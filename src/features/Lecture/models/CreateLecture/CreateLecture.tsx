import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LectureInput } from "../../../../generated/graphql";
import { useUpdateLectureMutation } from "../../../../api/mutation/updateLecture";
import RHF from "../../../../shared/ui/InputRHF";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { ICreateLecture } from "./CreateLecture.types";
import styles from "./CreateLecture.module.scss";
import { Button, Typography } from "@mui/material";

const CreateLecture: React.FC<ICreateLecture> = ({ setIdLecture }) => {
  const { handleSubmit, control } = useForm<LectureInput>({
    defaultValues: {
      subject: "",
      description: "",
    },
  });
  const [updateLecture] = useUpdateLectureMutation();

  const onSubmit: SubmitHandler<LectureInput> = (data) => {
    updateLecture({
      variables: { input: data },
    }).then((response) => {
      if (response.data?.updateLecture?.id)
        setIdLecture(response.data?.updateLecture?.id);
    });
  };
  return (
    <LayoutOnCenter>
      <form className={styles.form}>
        <Typography align="center" variant="h4" component="h4">
          Create Lecture
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

export default CreateLecture;
