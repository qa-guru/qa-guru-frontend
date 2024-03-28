import { Box, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";

import { UI_CONSTANTS } from "../../constants";

interface IColumnBox {
  showHomeworkDetails: boolean;
  isUpLg: boolean;
}

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    margin: "0 6px",
    color: "transparent",
  },
  "& .MuiPaginationItem-root.MuiPaginationItem-circular": {
    backgroundColor: theme.palette.app.secondary,
  },
  "& .MuiPaginationItem-root.MuiPaginationItem-circular.Mui-selected": {
    backgroundColor: theme.palette.app.primary,
    color: "transparent",
  },
}));

export const StyledWrapper = styled(Box)({
  display: "flex",
  minWidth: "100%",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: "15px",
}));

export const StyledMobileWrapper = styled(Box)({
  marginTop: "20px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
});

export const StyledColumnBox = styled(Box, {
  shouldForwardProp: (prop) =>
    !["showHomeworkDetails", "isUpLg"].includes(prop as string),
})<IColumnBox>(({ showHomeworkDetails, isUpLg }) => ({
  width:
    showHomeworkDetails && isUpLg
      ? UI_CONSTANTS.MIN_COLUMN_WIDTH
      : UI_CONSTANTS.MAX_COLUMN_WIDTH,
}));
