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

const filterLabels = {
  firstName: "Имя",
  phoneNumber: "Телефон",
  email: "Email",
};

type FilterKey = keyof typeof filterLabels;

const InputFilter: FC = () => {
  const { setFilter } = useContext(TableAdminFilterContext);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("firstName");

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
    setActiveFilter(value as FilterKey);
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
          placeholder={`Введите ${filterLabels[activeFilter]}`}
        />
      </StyledTabPanel>
    </TabContext>
  );
};

export default InputFilter;
