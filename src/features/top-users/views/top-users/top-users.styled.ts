import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledTitle = styled(Typography)({
  marginBottom: "20px",
});

export const StyledPaper = styled(Paper)({
  borderRadius: "10px",
  padding: 0,
  margin: "20px 0 40px",
});

export const StyledUserRowBox = styled(Box)({
  position: "absolute",
  left: "10px",
});

export const StyledMobileBox = styled(Box)({
  textAlign: "end",
});

export const StyledRating = styled(Typography)({
  marginTop: "50px",
});

export const StyledRatingBox = styled(Box)({
  textAlign: "end",
  marginTop: "40px",
});

export const StyledDate = styled(Typography)({
  whiteSpace: "nowrap",
});
