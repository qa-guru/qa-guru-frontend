import { Control } from "react-hook-form";

export interface IFormInputProps {
  control: Control<any, any>;
  label?: string;
  placeholder?: any;
  options?: any[];
  name: any;
  type?: string;
  multiline?: boolean;
  maxRows?: string | number;
  minRows?: string | number;
  defaultValue?: string;
  inputProps?: any;
  onChange?: (e: any) => void;
  disabled?: boolean;
  content?: Array<{ value: string; label: string }>;
}
