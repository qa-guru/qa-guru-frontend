import { Control } from "react-hook-form";

export interface IFormInputProps {
  control: Control<any, any>;
  label?: string;
  placeholder?: any;
  content?: any;
  name: any;
  defaultValue?: string;
  type?: string;
  multiline?: boolean;
  rows?: string | number;
}
