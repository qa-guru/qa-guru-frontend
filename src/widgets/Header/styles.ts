import { primary } from "../../theme/colors";

export const style = {
  wrapper: {
    padding: { md: "7px 20px 7px", xs: 0 },
    maxWidth: "1920px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    marginBottom: "30px",
    alignItems: "center",
  },
  paper: { borderRadius: 0 },
  box: { display: "flex", alignItems: "center" },
  svgIcon: { mt: "7px", height: "31px", width: { xs: "120px", sm: "166px" } },
  link: { textDecoration: "none", color: primary.main },
};
