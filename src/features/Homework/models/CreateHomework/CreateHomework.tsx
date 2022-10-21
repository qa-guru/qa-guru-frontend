import { Button, Form, Typography } from "antd";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateLectureHomeWorkMutation } from "../../../../api/mutation/updateLectureHomework";
import { LectureHomeWorkInput } from "../../../../generated/graphql";
import Ui from "../../../../shared/ui/Input";
import styles from "./CreateHomework.module.scss";
import { ICreateHomeWork } from "./CreateHomework.types";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";

const { Title } = Typography;

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
      <Title className={styles.title}>Create Homework</Title>
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
    </LayoutOnCenter>
  );
};

export default CreateHomework;
