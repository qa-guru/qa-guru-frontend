import { FC, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";

import { TableAdminFilterContext } from "../../context/admin-table-context";

interface InputFilterProps {}

const InputFilter: FC<InputFilterProps> = () => {
  const { setFilter } = useContext(TableAdminFilterContext);

  const { control, watch } = useForm({
    defaultValues: {
      field: "",
    },
  });

  const fieldValue = watch("field");

  useEffect(() => {
    console.log("fieldValue", fieldValue);
    // @ts-ignore
    setFilter(fieldValue);
  }, [fieldValue]);

  return (
    <InputText
      control={control}
      name="field"
      placeholder="LAST_NAME PHONE EMAIL RATING"
    />
  );
};

export default InputFilter;
