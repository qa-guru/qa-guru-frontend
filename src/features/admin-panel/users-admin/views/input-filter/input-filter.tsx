import { FC, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { TabContext } from "@mui/lab";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import { MailOutline, Person } from "@mui/icons-material";

import { useTableAdminFilter } from "../../context/admin-table-context";
import {
  StyledIconButton,
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

  const { control, watch, reset } = useForm({
    defaultValues: {
      filterValue: "",
    },
  });

  const filterValue = watch("filterValue");

  const handleFilterChange = (newFilter: FilterKey) => {
    setActiveFilter(newFilter);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setFilter({ [activeFilter]: filterValue });
    }
  };

  const handleReset = () => {
    setFilter(null);
    reset();
  };

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
                    <StyledIconButton
                      onClick={() => handleFilterChange("firstName")}
                    >
                      <Tooltip title="Имя">
                        <Person fontSize="small" color="primary" />
                      </Tooltip>
                    </StyledIconButton>
                    <StyledIconButton
                      onClick={() => handleFilterChange("email")}
                    >
                      <Tooltip title="Email">
                        <MailOutline fontSize="small" color="primary" />
                      </Tooltip>
                    </StyledIconButton>
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
          <IconButton onClick={handleReset}>
            <Tooltip title="Сбросить">
              <RefreshIcon fontSize="small" color="primary" />
            </Tooltip>
          </IconButton>
        </StyledStack>
      </StyledTabPanel>
    </TabContext>
  );
};

export default InputFilter;
