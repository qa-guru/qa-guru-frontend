import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/InputRHF/Input.types";
import InputSelectMultiple from "../../shared/ui/InputRHF/SelectMultiple/SelectMultiple";

const data = [
  "Maths",
  "Accounting",
  "Arts",
  "Music",
  "Dance",
  "Science",
  "Geometry",
  "Geography",
  "Sports",
  "English",
  "Physical",
];

export default {
  title: "Inputs/SelectMultiple",
  component: InputSelectMultiple,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return (
    <InputSelectMultiple {...args} control={control} name="" content={data} />
  );
};

export const SelectMultiple = Template.bind({});
