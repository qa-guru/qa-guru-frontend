import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputText from "../../shared/ui/Input/Text/Text";

export default {
  title: "Inputs/Text",
  component: InputText,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputText {...args} control={control} name="" />;
};

export const Text = Template.bind({});
