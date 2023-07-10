import { grey, white } from "../../../../theme/colors";

export const styles = {
  paper: {
    backgroundColor: white,
    borderRadius: 1,
    marginBottom: 1.5,
    boxShadow: 1,
    cursor: "grab",
    minHeight: "230px",
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
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    padding: 1,
  },
};
