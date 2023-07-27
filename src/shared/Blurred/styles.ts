import { primary } from "../../theme/colors";

export const style = {
  wrapper: { filter: "blur(3.5px)", pointerEvents: "none" },
  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "default",
    borderRadius: "7px",
    "&:hover": { backgroundColor: primary.main },
  },
};
