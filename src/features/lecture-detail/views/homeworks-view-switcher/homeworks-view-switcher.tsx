import { FC } from "react";
import { IconButton, Stack } from "@mui/material";
import { ViewKanban, ViewList } from "@mui/icons-material";

import { HomeworksOtherStudentsTotalElements } from "../../containers";
import { IHomeworksViewSwitcher } from "./homeworks-view-swither.types";
import { StyledWrapper } from "./homeworks-view-swither.styled";

const HomeworksViewSwitcher: FC<IHomeworksViewSwitcher> = ({
  view,
  onKanbanView,
  onListView,
}) => (
  <StyledWrapper>
    <HomeworksOtherStudentsTotalElements />
    <Stack direction="row">
      <IconButton size="small" onClick={onKanbanView}>
        <ViewKanban color="primary" />
      </IconButton>
      <IconButton size="small" onClick={onListView}>
        <ViewList color="primary" />
      </IconButton>
    </Stack>
  </StyledWrapper>
);

export default HomeworksViewSwitcher;
