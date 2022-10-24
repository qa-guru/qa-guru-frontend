import React from "react";
import { Controller } from "react-hook-form";
import { Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { IFormInputProps } from "../Input.types";

const { Option } = Select;

const InputSelect: React.FC<IFormInputProps> = ({
  control,
  placeholder,
  name,
  content,
}) => {
  const generateSingleOption = () => {
    return content.map((option: string) => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));
  };

  return (
    <FormItem>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value} placeholder={placeholder}>
            {generateSingleOption()}
          </Select>
        )}
      />
    </FormItem>
  );
};

export default InputSelect;
