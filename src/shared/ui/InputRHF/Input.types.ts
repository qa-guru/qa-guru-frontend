export interface IFormInputProps {
  control: any;
  label?: string;
  placeholder?: string;
  content?: any;
  direction?: "horizontal" | "vertical";
  min?: number;
  max?: number;
  yupSync?: any;
  name: any;
  setValue?: any;
  onChange?: any;
  defaultValue?: string;
}
