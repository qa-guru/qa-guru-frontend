import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { defaultValues } from "../../config/defaultValues";
import PracticeFormViews from "../../ui/FormViews/FormViews";
import { Button, Form, Typography } from "antd";
import { IFormMainProps, IFormPracticeInput } from "./FormMain.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../lib/validation";
import styles from "./FormMain.module.scss";

const { Text } = Typography;

const FormMain: React.FC<IFormMainProps> = ({ setData }) => {
  const { handleSubmit, control, setValue, reset } =
    useForm<IFormPracticeInput>({
      defaultValues,
      resolver: yupResolver(validationSchema),
    });

  const onSubmit: SubmitHandler<IFormPracticeInput> = (data) => {
    setData(data);
  };

  const yupSync = {
    async validator({ field }: any, value: any) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };

  return (
    <>
      <Typography className={styles.title}>Practice Form</Typography>
      <Form onFinish={handleSubmit(onSubmit)}>
        <PracticeFormViews
          yupSync={yupSync}
          setValue={setValue}
          control={control}
        />
        <div className={styles.wrapper}>
          <Button className={styles.wrapper__button} htmlType="submit">
            Submit
          </Button>
          <Button className={styles.wrapper__button} onClick={() => reset()}>
            Reset
          </Button>
          <footer className={styles.footer}>
            <Text className={styles.text}>© QA GURU</Text>
          </footer>
        </div>
      </Form>
    </>
  );
};

export default FormMain;
