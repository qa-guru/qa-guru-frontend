import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LectureInput } from "../../../../generated/graphql";
import { useUpdateLectureMutation } from "../../../../api/mutation/updateLecture";
import { Button, Form } from "antd";
import Ui from "../../../../shared/ui/Input";
import { defaultValues } from "../../config/defaultValues";
import styles from "./CreateLecture.module.scss";

const CreateLecture: React.FC = () => {
  const { handleSubmit, control } = useForm<LectureInput>({
    defaultValues,
  });
  const [updateLecture] = useUpdateLectureMutation();

  const onSubmit: SubmitHandler<LectureInput> = (data) => {
    updateLecture({
      variables: { input: data },
    });
  };
  return (
    <Form
      className={styles.form}
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
    >
      <Ui.Text name="subject" control={control} label="Subject" />
      <Ui.Text name="description" control={control} label="Description" />
      <Button className={styles.btn} htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default CreateLecture;
