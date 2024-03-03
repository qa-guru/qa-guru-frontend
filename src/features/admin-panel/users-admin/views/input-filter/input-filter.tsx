import { FC, KeyboardEvent, SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { TabContext } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setFilter({ [activeFilter]: filterValue });
    }
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
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row">
                  <IconButton onClick={() => setFilter({})}>
                    <Tooltip title="Сбросить">
                      <RefreshIcon fontSize="small" color="primary" />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    onClick={() => setFilter({ [activeFilter]: filterValue })}
                  >
                    <Tooltip title="Поиск">
                      <SearchIcon fontSize="small" color="primary" />
                    </Tooltip>
                  </IconButton>
                </Stack>
              </InputAdornment>
            ),
          }}
        />
      </StyledTabPanel>
    </TabContext>
  );
};

export default InputFilter;
