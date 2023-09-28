import { Box, Pagination, Stack } from "@mui/material";
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

export const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: "20px",
}));

export const StyledMobileWrapper = styled(Box)(({ theme }) => ({
  marginTop: "20px",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
}));

export const StyledHomeworkDetails = styled(Box)(({ theme }) => ({
  minWidth: "33.5vw",
}));
