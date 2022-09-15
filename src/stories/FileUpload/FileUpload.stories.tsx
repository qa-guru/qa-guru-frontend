import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputFileUploud from "../../shared/ui/Input/FileUploud/FileUploud";

export default {
  title: "Inputs/File",
  component: InputFileUploud,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputFileUploud {...args} control={control} name="" />;
};

export const File = Template.bind({});
