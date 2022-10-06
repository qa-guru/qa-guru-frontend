import { Button, Form } from "antd";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateLectureHomeWorkMutation } from "../../../../api/mutation/updateLectureHomework";
import { LectureHomeWorkInput } from "../../../../generated/graphql";
import Ui from "../../../../shared/ui/Input";
import { defaultValues } from "../../config/defaultValues";
import styles from "./CreateHomework.module.scss";

const CreateHomework: React.FC = () => {
  const { handleSubmit, control } = useForm<LectureHomeWorkInput>({
    defaultValues,
  });
  // const [updateLectureHomeWork] = useUpdateLectureHomeWorkMutation();

  const onSubmit: SubmitHandler<LectureHomeWorkInput> = (data) => {
    // updateLectureHomeWork({
    //   variables: { input: data },
    // });
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

export default CreateHomework;
