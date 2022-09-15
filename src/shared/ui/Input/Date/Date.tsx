import React from "react";
import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import FormItem from "antd/lib/form/FormItem";
import { DatePicker, Typography } from "antd";
import styles from "./Date.module.scss";

const { Text } = Typography;

const InputDate: React.FC<IFormInputProps> = ({ control, label, name }) => {
  return (
    <FormItem>
      <Text>{label}</Text>
      {/* <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            className={styles.date}
            onChange={onChange}
            value={value}
          />
        )}
      /> */}
    </FormItem>
  );
};

export default InputDate;
