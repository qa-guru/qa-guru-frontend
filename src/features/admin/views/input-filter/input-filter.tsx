import { FC, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";

import { TableAdminFilterContext } from "../../context/admin-table-context";

const InputFilter: FC = () => {
  const { setFilter } = useContext(TableAdminFilterContext);
  const [activeFilter, setActiveFilter] = useState("firstName");

  const { control, watch } = useForm({
    defaultValues: {
      filterValue: "",
    },
  });

  const filterValue = watch("filterValue");

  useEffect(() => {
    setFilter({
      [activeFilter]: filterValue,
    });
  }, [filterValue, activeFilter]);

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  return (
    <>
      <div>
        <button onClick={() => handleFilterChange("firstName")}>Имя</button>
        <button onClick={() => handleFilterChange("phoneNumber")}>
          Телефон
        </button>
        <button onClick={() => handleFilterChange("email")}>Email</button>
      </div>
      <InputText
        control={control}
        name="filterValue"
        placeholder={`Введите ${activeFilter}`}
      />
    </>
  );
};

export default InputFilter;
