import { Checkbox, Space, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";

const InputCheckbox: React.FC<IFormInputProps> = ({
  name,
  control,
  label,
  content,
  direction,
}) => {
  const generateCheckboxOptions = (content: any) => {
    return content.map((singleOptionValue: any) => (
      <Checkbox key={singleOptionValue.id} value={singleOptionValue.value}>
        {singleOptionValue.label}
      </Checkbox>
    ));
  };

  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox.Group value={value} onChange={onChange}>
            <Space direction={direction}>
              {generateCheckboxOptions(content)}
            </Space>
          </Checkbox.Group>
        )}
      />
    </div>
  );
};

export default InputCheckbox;
