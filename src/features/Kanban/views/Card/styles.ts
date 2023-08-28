import { grey, primary, white } from "../../../../theme/colors";

export const style = {
  paper: {
    backgroundColor: white,
    cursor: "grab",
    flexGrow: "1",
    margin: 1,
    "&:hover": {
      backgroundColor: `${primary.main}40`,
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
    boxShadow: "0 1px 3px rgba(0, 0, 0, .6)",
    padding: 1,
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  activeCard: {
    backgroundColor: `${primary.main}40`,
  },
};
