import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/InputRHF/Input.types";
import InputRadio from "../../shared/ui/InputRHF/Radio/Radio";

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
  title: "Inputs/Radio",
  component: InputRadio,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputRadio {...args} control={control} name="" content={data} />;
};

export const Radio = Template.bind({});
