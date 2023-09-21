import { Pagination } from "@mui/material";
import { styled } from "@mui/system";

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    margin: "0 6px",
    color: "transparent",
  },
  "& .MuiPaginationItem-root.MuiPaginationItem-circular": {
    backgroundColor: theme.palette.secondary.main,
  },
  "& .MuiPaginationItem-root.MuiPaginationItem-circular.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "transparent",
  },
}));
