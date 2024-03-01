import { FC, SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { TabContext } from "@mui/lab";
import { Button, Stack } from "@mui/material";

import { useTableAdminFilter } from "../../context/admin-table-context";
import {
  StyledTab,
  StyledTabList,
  StyledTabPanel,
} from "./input-filter.styled";

const filterLabels = {
  firstName: "имя пользователя",
  phoneNumber: "телефон пользователя",
  email: "email пользователя",
};

type FilterKey = keyof typeof filterLabels;

const InputFilter: FC = () => {
  const { setFilter } = useTableAdminFilter();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("firstName");

  const { control, watch } = useForm({
    defaultValues: {
      filterValue: "",
    },
  });

  const filterValue = watch("filterValue");

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
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            color: "app.white",
          }}
          variant="contained"
          onClick={() => setFilter({ [activeFilter]: filterValue })}
        >
          Поиск
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setFilter({})}
        >
          Cбросить
        </Button>
      </Stack>
    </TabContext>
  );
};

export default InputFilter;
