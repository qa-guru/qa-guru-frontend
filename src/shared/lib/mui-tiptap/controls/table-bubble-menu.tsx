import { findParentNodeClosestToPos, posToDOMRect } from "@tiptap/core";
import { useMemo, useCallback, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";
import { type PopoverVirtualElement } from "@mui/material";

import { Maybe } from "api/graphql/generated/graphql";

import ControlledBubbleMenu, {
  type ControlledBubbleMenuProps,
} from "./controlled-bubble-menu";
import { useRichTextEditorContext } from "../context";
import TableMenuControls, {
  type TableMenuControlsProps,
} from "./table-menu-controls";

export type TableBubbleMenuProps = {
  labels?: TableMenuControlsProps["labels"];
} & Partial<Except<ControlledBubbleMenuProps, "open" | "editor" | "children">>;

const useStyles = makeStyles({
  name: "TableBubbleMenu",
})((theme) => ({
  controls: {
    maxWidth: "90vw",
    padding: theme.spacing(0.5, 1),
  },
}));

export default function TableBubbleMenu({
  labels,
  ...controlledBubbleMenuProps
}: TableBubbleMenuProps) {
  const editor = useRichTextEditorContext();
  const { classes } = useStyles();
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);

  const bubbleMenuAnchorEl = useMemo(
    () =>
      editor
        ? {
            getBoundingClientRect: () => {
              const nearestTableParent = editor.isActive("table")
                ? findParentNodeClosestToPos(
                    editor.state.selection.$anchor,
                    (node) => node.type.name === "table"
                  )
                : null;

              if (nearestTableParent) {
                const wrapperDomNode = editor.view.nodeDOM(
                  nearestTableParent.pos
                ) as Maybe<HTMLElement | undefined>;

                const tableDomNode = wrapperDomNode?.querySelector("table");
                if (tableDomNode) {
                  return tableDomNode.getBoundingClientRect();
                }
              }

              const { ranges } = editor.state.selection;
              const from = Math.min(...ranges.map((range) => range.$from.pos));
              const to = Math.max(...ranges.map((range) => range.$to.pos));
              return posToDOMRect(editor.view, from, to);
            },
          }
        : null,
    [editor]
  );

  const handleClose = useCallback(() => {
    setIsManuallyHidden(true);
    if (editor) {
      editor.commands.blur();
    }
  }, [editor]);

  useEffect(() => {
    if (!editor?.isActive("table")) {
      setIsManuallyHidden(false);
    }
  }, [editor?.isActive("table")]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && editor?.isActive("table")) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor, handleClose]);

  if (!editor?.isEditable) {
    return null;
  }

  const controls = (
    <TableMenuControls
      className={classes.controls}
      labels={labels}
      onClose={handleClose}
    />
  );

  // Логика показа меню - активная таблица и не скрыто вручную
  const shouldShowMenu = editor.isActive("table") && !isManuallyHidden;

  return (
    <ControlledBubbleMenu
      editor={editor}
      open={shouldShowMenu}
      onClose={handleClose}
      anchorEl={bubbleMenuAnchorEl as PopoverVirtualElement}
      placement={{
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
      }}
      fallbackPlacements={[
        { vertical: "bottom", horizontal: "left" },
        { vertical: "top", horizontal: "center" },
        { vertical: "bottom", horizontal: "center" },
        { vertical: "top", horizontal: "right" },
        { vertical: "bottom", horizontal: "right" },
      ]}
      flipPadding={{ top: 35, left: 8, right: 8, bottom: -Infinity }}
      {...controlledBubbleMenuProps}
    >
      {controls}
    </ControlledBubbleMenu>
  );
}
