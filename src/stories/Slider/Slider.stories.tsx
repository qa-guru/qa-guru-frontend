import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputSlider from "../../shared/ui/Input/Slider/Slider";

export default {
  title: "Inputs/Slider",
  component: InputSlider,
  decorators: [
    (Story: any) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return <InputSlider {...args} control={control} name="" />;
};

export const Slider = Template.bind({});
