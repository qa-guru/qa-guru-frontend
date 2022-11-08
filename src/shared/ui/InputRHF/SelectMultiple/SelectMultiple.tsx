import { Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";

const { Option } = Select;

const InputSelectMultiple: React.FC<IFormInputProps> = ({
  control,
  label,
  name,
  content,
}) => {
  const generateSingleSubjects = () => {
    return content.map((subject: any) => (
      <Option key={subject} value={subject}>
        {subject}
      </Option>
    ));
  };

  return (
    <FormItem label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            mode="tags"
            value={value}
            style={{ width: "100%" }}
            onChange={onChange}
          >
            {generateSingleSubjects()}
          </Select>
        )}
      />
    </FormItem>
  );
};

export default InputSelectMultiple;
