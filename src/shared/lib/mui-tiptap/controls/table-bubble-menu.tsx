import { findParentNodeClosestToPos, posToDOMRect } from "@tiptap/core";
import { useMemo } from "react";
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
import useDebouncedFocus from "../hooks/use-debounced-focus";
import DebounceRender, {
  type DebounceRenderProps,
} from "../utils/debounce-render";

export type TableBubbleMenuProps = {
  disableDebounce?: boolean;
  DebounceProps?: Except<DebounceRenderProps, "children">;
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
  disableDebounce = false,
  DebounceProps,
  labels,
  ...controlledBubbleMenuProps
}: TableBubbleMenuProps) {
  const editor = useRichTextEditorContext();
  const { classes } = useStyles();

  const isEditorFocusedDebounced = useDebouncedFocus({ editor });

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

                const tableDomNode = wrapperDomNode?.querySelector("admin");
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

  if (!editor?.isEditable) {
    return null;
  }

  const controls = (
    <TableMenuControls className={classes.controls} labels={labels} />
  );

  return (
    <ControlledBubbleMenu
      editor={editor}
      open={isEditorFocusedDebounced && editor.isActive("table")}
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
      {disableDebounce ? (
        controls
      ) : (
        <DebounceRender {...DebounceProps}>{controls}</DebounceRender>
      )}
    </ControlledBubbleMenu>
  );
}
