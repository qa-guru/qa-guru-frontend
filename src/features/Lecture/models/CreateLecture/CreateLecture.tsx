import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LectureInput } from "../../../../generated/graphql";
import { useUpdateLectureMutation } from "../../../../api/mutation/updateLecture";
import { Button, Form, Typography } from "antd";
import Ui from "../../../../shared/ui/Input";
import styles from "./CreateLecture.module.scss";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { ICreateLecture } from "./CreateLecture.types";

const { Title } = Typography;

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
      <Title className={styles.title}>Create Lecture</Title>
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

export default CreateLecture;
