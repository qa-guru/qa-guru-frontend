import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { TabContext } from "@mui/lab";

import { TableAdminFilterContext } from "../../context/admin-table-context";
import {
  StyledTab,
  StyledTabList,
  StyledTabPanel,
} from "./input-filter.styled";

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

  const handleFilterChange = (_: SyntheticEvent, value: string) => {
    setActiveFilter(value);
  };

  return (
    <TabContext value={activeFilter}>
      <StyledTabList onChange={handleFilterChange}>
        <StyledTab label="Имя" value="firstName" wrapped />
        <StyledTab label="Телефон" value="phoneNumber" wrapped />
        <StyledTab label="Email" value="email" wrapped />
      </StyledTabList>
      <StyledTabPanel value={activeFilter}>
        <InputText
          control={control}
          name="filterValue"
          placeholder={`Введите ${activeFilter}`}
        />
      </StyledTabPanel>
    </TabContext>
  );
};

export default InputFilter;
