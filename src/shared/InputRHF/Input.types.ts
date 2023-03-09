import { Control } from "react-hook-form";

export interface IFormInputProps {
  control: Control<any, any>;
  label?: string;
  placeholder?: any;
  content?: any;
  name: any;
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  defaultValue?: string;
}
