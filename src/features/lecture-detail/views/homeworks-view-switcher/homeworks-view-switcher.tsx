import { FC } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { ViewKanban, ViewList } from "@mui/icons-material";

import { HomeworksOtherStudentsTotalElements } from "../../containers";
import { IHomeworksViewSwitcher } from "./homeworks-view-switcher.types";
import { StyledWrapper } from "./homeworks-view-switcher.styled";

const HomeworksViewSwitcher: FC<IHomeworksViewSwitcher> = ({
  onKanbanView,
  onListView,
}) => (
  <StyledWrapper>
    <HomeworksOtherStudentsTotalElements />
    <Stack direction="row">
      <Tooltip title="Отобразить доской">
        <IconButton size="small" onClick={onKanbanView}>
          <ViewKanban color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Отобразить списком">
        <IconButton size="small" onClick={onListView}>
          <ViewList color="primary" />
        </IconButton>
      </Tooltip>
    </Stack>
  </StyledWrapper>
);

export default HomeworksViewSwitcher;
