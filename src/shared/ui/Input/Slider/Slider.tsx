import { Controller } from "react-hook-form";
import { IFormInputProps } from "../Input.types";
import FormItem from "antd/lib/form/FormItem";
import { Slider } from "antd";

const InputSlider = ({ name, control, label, min, max }: IFormInputProps) => {
  return (
    <FormItem label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Slider min={min} max={max} onChange={onChange} value={value} />
        )}
      />
    </FormItem>
  );
};

export default InputSlider;
