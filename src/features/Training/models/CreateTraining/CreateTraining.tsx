import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, Select, Typography } from "antd";
import Ui from "../../../../shared/ui/Input";
import { TrainingInput } from "../../../../generated/graphql";
import { useUpdateTrainingMutation } from "../../../../api/mutation/updateTraining";
import styles from "./CreateTraining.module.scss";
import LayoutOnCenter from "../../../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { ICreateTraining } from "./CreateTraining.types";

const { Option } = Select;
const { Title } = Typography;

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
      <Title className={styles.title}>Create Training</Title>
      <Form
        className={styles.form}
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
      >
        <Ui.Text name="name" control={control} label="Name" />
        <Ui.Select
          name="techStack"
          control={control}
          placeholder="Select TechStack"
          content={["JAVA", "PYTHON"]}
        />
        <Button className={styles.btn} htmlType="submit">
          Save
        </Button>
      </Form>
    </LayoutOnCenter>
  );
};

export default CreateTraining;
