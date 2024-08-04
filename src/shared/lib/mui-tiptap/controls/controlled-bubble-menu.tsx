import { ReactNode, useCallback } from "react";
import {
  Fade,
  Paper,
  Popover,
  useTheme,
  type PaperProps,
  type PopoverProps,
  type PopoverVirtualElement,
} from "@mui/material";
import { isNodeSelection, posToDOMRect, type Editor } from "@tiptap/core";
import { makeStyles } from "tss-react/mui";

import { Maybe } from "api/graphql/generated/graphql";

import { Z_INDEXES, getUtilityClasses } from "../styles";

export type ControlledBubbleMenuClasses = ReturnType<
  typeof useStyles
>["classes"];

export type ControlledBubbleMenuProps = {
  editor: Editor;
  open: boolean;
  children: ReactNode;
  anchorEl?: Maybe<
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
  >;
  container?: PopoverProps["container"];
  disablePortal?: PopoverProps["disablePortal"];
  placement?: {
    anchorOrigin?: PopoverProps["anchorOrigin"];
    transformOrigin?: PopoverProps["transformOrigin"];
  };
  fallbackPlacements?: PopoverProps["transformOrigin"][];
  flipPadding?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  classes?: Partial<ControlledBubbleMenuClasses>;
  PaperProps?: Partial<PaperProps>;
  onClose?: () => void;
};

const controlledBubbleMenuClasses: ControlledBubbleMenuClasses =
  getUtilityClasses("ControlledBubbleMenu", ["root", "paper"]);

const useStyles = makeStyles({ name: "ControlledBubbleMenu" })((theme) => ({
  root: {
    zIndex: Z_INDEXES.BUBBLE_MENU,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

type VirtualElement = PopoverVirtualElement & {
  getBoundingClientRect: () => DOMRect;
  nodeType: number;
};

export default function ControlledBubbleMenu({
  editor,
  open,
  className,
  classes: overrideClasses = {},
  children,
  anchorEl,
  container,
  disablePortal,
  PaperProps,
  onClose,
}: ControlledBubbleMenuProps) {
  const { classes, cx } = useStyles(undefined, {
    props: { classes: overrideClasses },
  });
  const theme = useTheme();

  const defaultAnchorEl = useCallback((): VirtualElement => {
    const { ranges } = editor.state.selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    const domRect: VirtualElement = {
      getBoundingClientRect: () => {
        if (isNodeSelection(editor.state.selection)) {
          const node = editor.view.nodeDOM(from);

          if (node instanceof HTMLElement) {
            return node.getBoundingClientRect();
          }
        }
        return posToDOMRect(editor.view, from, to);
      },
      nodeType: 1,
    };

    return domRect;
  }, [editor]);

  const resolvedAnchorEl =
    typeof anchorEl === "function" || anchorEl instanceof Element
      ? anchorEl
      : defaultAnchorEl;

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={resolvedAnchorEl}
      container={container}
      disablePortal={disablePortal}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      className={cx(controlledBubbleMenuClasses.root, classes.root, className)}
      transitionDuration={{
        enter: theme.transitions.duration.enteringScreen,
        exit: 0,
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={7}
          {...PaperProps}
          className={cx(
            controlledBubbleMenuClasses.paper,
            classes.paper,
            PaperProps?.className
          )}
        >
          {children}
        </Paper>
      </Fade>
    </Popover>
  );
}
