import { primary, white } from "../../../theme/colors";

export const style = {
  link: { textDecoration: "none" },
  paper: { padding: { xs: "15px", md: "20px" } },
  circle: {
    minWidth: "40px",
    height: "40px",
    bgcolor: primary.main,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: white.main,
  },
};
