import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, Select } from "antd";
import Ui from "../../../../shared/ui/Input";
import { TrainingInput } from "../../../../generated/graphql";
import { useUpdateTrainingMutation } from "../../../../api/mutation/updateTraining";
import styles from "./CreateTraining.module.scss";
import { defaultValues } from "../../config/defaultValues";
const { Option } = Select;

const CreateTraining = () => {
  const { handleSubmit, control } = useForm<TrainingInput>({
    defaultValues,
  });

  const [updateTraining] = useUpdateTrainingMutation();

  const onSubmit: SubmitHandler<TrainingInput> = (data) => {
    updateTraining({
      variables: { input: data },
    });
  };

  return (
    <Form
      className={styles.form}
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
    >
      <Ui.Text name="name" control={control} label="Name" />
      <Controller
        name="techStack"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            value={value}
            placeholder="Select TechStack"
          >
            <Option value="JAVA">JAVA</Option>
            <Option value="PYTHON">PYTHON</Option>
          </Select>
        )}
      ></Controller>
      <Button className={styles.btn} htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default CreateTraining;
