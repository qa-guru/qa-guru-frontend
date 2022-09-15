import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputTextArea from "../../shared/ui/Input/TextArea/TextArea";

export default {
  title: "Inputs/TextArea",
  component: InputTextArea,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputTextArea {...args} control={control} name="" />;
};

export const TextArea = Template.bind({});
