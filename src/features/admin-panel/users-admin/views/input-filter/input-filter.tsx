import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TabContext } from "@mui/lab";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import { MailOutline, Person } from "@mui/icons-material";

import { InputText } from "shared/components/form";

import { useTableAdminFilter } from "../../context/admin-table-context";
import {
  StyledIconButton,
  StyledIconInputButton,
  StyledIconsStack,
  StyledStack,
  StyledTabPanel,
} from "./input-filter.styled";
import RoleSelection from "../role-selection";

const filterLabels = {
  firstName: "имя",
  email: "email",
};

type FilterKey = keyof typeof filterLabels;

const InputFilter: FC = () => {
  const { setFilter } = useTableAdminFilter();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("firstName");

  const { control, watch, reset, resetField } = useForm({
    defaultValues: {
      filterValue: "",
      role: "",
    },
  });

  const filterValue = watch("filterValue");
  const role = watch("role");

  const handleFilterChange = (newFilter: FilterKey) => {
    setActiveFilter(newFilter);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setFilter({ [activeFilter]: filterValue });
      resetField("role");
    }
  };

  const handleReset = () => {
    setFilter(null);
    reset();
  };

  useEffect(() => {
    if (role) {
      resetField("filterValue");
    }
  }, [role, resetField]);

  return (
    <TabContext value={activeFilter}>
      <StyledTabPanel value={activeFilter}>
        <StyledStack>
          <InputText
            size="small"
            control={control}
            name="filterValue"
            placeholder={`Введите ${filterLabels[activeFilter]}`}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StyledIconsStack>
                    <StyledIconInputButton
                      isActive={activeFilter === "firstName"}
                      onClick={() => handleFilterChange("firstName")}
                    >
                      <Tooltip title="Имя">
                        <Person fontSize="small" />
                      </Tooltip>
                    </StyledIconInputButton>
                    <StyledIconInputButton
                      isActive={activeFilter === "email"}
                      onClick={() => handleFilterChange("email")}
                    >
                      <Tooltip title="Email">
                        <MailOutline fontSize="small" />
                      </Tooltip>
                    </StyledIconInputButton>
                  </StyledIconsStack>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <StyledIconsStack>
                    <StyledIconButton
                      onClick={() => setFilter({ [activeFilter]: filterValue })}
                    >
                      <Tooltip title="Поиск">
                        <SearchIcon fontSize="small" color="primary" />
                      </Tooltip>
                    </StyledIconButton>
                  </StyledIconsStack>
                </InputAdornment>
              ),
            }}
          />
          <RoleSelection control={control} />
          <StyledIconButton onClick={handleReset}>
            <Tooltip title="Сбросить">
              <RefreshIcon fontSize="small" color="primary" />
            </Tooltip>
          </StyledIconButton>
        </StyledStack>
      </StyledTabPanel>
    </TabContext>
  );
};

export default InputFilter;
