import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/InputRHF/Input.types";
import InputText from "../../shared/ui/InputRHF/InputTextField/InputTextField";

export default {
  title: "Inputs/InputTextField",
  component: InputText,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputText {...args} control={control} name="" />;
};

export const Text = Template.bind({});
