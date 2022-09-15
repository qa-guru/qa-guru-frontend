import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputSelectOption from "../../shared/ui/Input/SelectOption/SelectOption";

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
  title: "Inputs/SelectOption",
  component: InputSelectOption,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return (
    <InputSelectOption {...args} control={control} name="" content={data} />
  );
};

export const SelectOption = Template.bind({});
