import { Cascader, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const InputSelectCascader: React.FC<IFormInputProps> = ({
  name,
  setValue,
  control,
  content,
  label,
}) => {
  const [option, setOption] = useState<unknown>();

  function convertLocationSchema(
    content: { state: string; cities: string[] }[]
  ): Option[] {
    return content.map((option) => {
      return {
        value: option.state.toLowerCase(),
        label: option.state,
        children: option.cities.map((city) => {
          return {
            value: city.toLowerCase(),
            label: city,
          };
        }),
      };
    });
  }

  useEffect(() => {
    if (option) setValue(name, option);
  }, [option]);

  const handleChange = (value: unknown) => {
    setOption(value);
  };

  return (
    <>
      <Typography>{label}</Typography>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Cascader
            options={convertLocationSchema(content)}
            onChange={handleChange}
          />
        )}
      />
    </>
  );
};

export default InputSelectCascader;
