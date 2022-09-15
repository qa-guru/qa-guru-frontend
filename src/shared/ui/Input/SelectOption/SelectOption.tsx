import { Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import styles from "./SelectOption.module.scss";

const { Text } = Typography;

const InputSelectOption: React.FC<IFormInputProps> = ({
  name,
  control,
  label,
  content,
}) => {
  const generateSingleOptions = () => {
    return content.map((option: any) => {
      return (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      );
    });
  };
  return (
    <FormItem>
      <Text>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <select className={styles.select} onChange={onChange} value={value}>
            <option value="" disabled />
            {generateSingleOptions()}
          </select>
        )}
      />
    </FormItem>
  );
};

export default InputSelectOption;
