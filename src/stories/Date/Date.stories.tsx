import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputDate from "../../shared/ui/Input/Date/Date";

export default {
  title: "Inputs/Date",
  component: InputDate,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputDate {...args} control={control} name="" />;
};

export const Date = Template.bind({});
