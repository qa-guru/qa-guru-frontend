import { grey, primary } from "theme/colors";

export const style = {
  paper: {
    cursor: "grab",
    flexGrow: "1",
    margin: 1,
    border: `1px solid transparent`,
    "&:hover": {
      transform: "scale(1.02)",
      transition: "transform 300ms ease-in-out",
    },
  },
  draggedPaper: {
    opacity: 0.5,
    cursor: "grabbing",
  },
  hiddenPaper: {
    visibility: "hidden",
  },
  cardHeader: {
    backgroundColor: grey.light,
    justifyContent: "space-between",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    padding: 1,
    width: "100%",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    position: "relative",
  },
  activeCard: {
    border: `1px solid ${primary.main}80`,
  },
};
