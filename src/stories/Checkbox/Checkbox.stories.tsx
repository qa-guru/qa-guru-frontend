import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputCheckbox from "../../shared/ui/Input/Checkbox/Checkbox";

const data = [
  {
    label: "option",
    value: "option",
    id: "1",
  },
  {
    label: "option",
    value: "option",
    id: "2",
  },
  {
    label: "option",
    value: "option",
    id: "3",
  },
];

export default {
  title: "Inputs/Checkbox",
  component: InputCheckbox,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputCheckbox {...args} control={control} name="" content={data} />;
};

export const Checkbox = Template.bind({});
