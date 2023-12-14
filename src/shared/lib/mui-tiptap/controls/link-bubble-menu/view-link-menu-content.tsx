import { Button, DialogActions, Link } from "@mui/material";
import { getMarkRange, getMarkType, type Editor } from "@tiptap/core";
import truncate from "lodash/truncate";
import type { ReactNode } from "react";
import { makeStyles } from "tss-react/mui";

import useKeyDown from "../../hooks/use-key-down";
import truncateMiddle from "../../utils/truncateMiddle";

export type ViewLinkMenuContentProps = {
  editor: Editor;
  onCancel: () => void;
  onEdit: () => void;
  onRemove: () => void;
  labels?: {
    viewLinkEditButtonLabel?: ReactNode;
    viewLinkRemoveButtonLabel?: ReactNode;
  };
};

const useStyles = makeStyles({ name: { ViewLinkMenuContent } })({
  linkPreviewText: {
    overflowWrap: "anywhere",
  },
});

export default function ViewLinkMenuContent({
  editor,
  onCancel,
  onEdit,
  onRemove,
  labels,
}: ViewLinkMenuContentProps) {
  const { classes } = useStyles();
  const linkRange = getMarkRange(
    editor.state.selection.$to,
    getMarkType("link", editor.schema)
  );
  const linkText = linkRange
    ? editor.state.doc.textBetween(linkRange.from, linkRange.to)
    : "";

  const currentHref =
    (editor.getAttributes("link").href as string | undefined) ?? "";

  useKeyDown("Escape", onCancel);

  return (
    <>
      <div className={classes.linkPreviewText}>
        {truncate(linkText, {
          length: 50,
          omission: "…",
        })}
      </div>

      <div className={classes.linkPreviewText}>
        <Link href={currentHref} target="_blank" rel="noopener">
          {truncateMiddle(currentHref, 50)}
        </Link>
      </div>

      <DialogActions sx={{ px: 0 }}>
        <Button
          onClick={onEdit}
          color="primary"
          variant="outlined"
          size="small"
        >
          {labels?.viewLinkEditButtonLabel ?? "Edit"}
        </Button>
        <Button
          onClick={onRemove}
          color="error"
          variant="outlined"
          size="small"
        >
          {labels?.viewLinkRemoveButtonLabel ?? "Remove"}
        </Button>
      </DialogActions>
    </>
  );
}
