import {
  Fade,
  Paper,
  Popper,
  useTheme,
  type PaperProps,
  type PopperProps,
} from "@mui/material";
import { isNodeSelection, posToDOMRect, type Editor } from "@tiptap/core";
import { useCallback } from "react";
import { makeStyles } from "tss-react/mui";

import { Z_INDEXES, getUtilityClasses } from "../styles";

export type ControlledBubbleMenuClasses = ReturnType<
  typeof useStyles
>["classes"];

export type ControlledBubbleMenuProps = {
  editor: Editor;
  open: boolean;
  children: React.ReactNode;
  anchorEl?: PopperProps["anchorEl"];

  container?: PopperProps["container"];

  disablePortal?: PopperProps["disablePortal"];

  placement?: PopperProps["placement"];

  fallbackPlacements?: PopperProps["placement"][];

  flipPadding?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  classes?: Partial<ControlledBubbleMenuClasses>;

  PaperProps?: Partial<PaperProps>;
};

const controlledBubbleMenuClasses: ControlledBubbleMenuClasses =
  getUtilityClasses("ControlledBubbleMenu", ["root", "paper"]);

const useStyles = makeStyles({ name: { ControlledBubbleMenu } })((theme) => ({
  root: {
    zIndex: Z_INDEXES.BUBBLE_MENU,
  },

  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function ControlledBubbleMenu({
  editor,
  open,
  className,
  classes: overrideClasses = {},
  children,
  anchorEl,
  container,
  disablePortal,
  placement = "top",
  fallbackPlacements = [
    "top",
    "bottom",
    "top-start",
    "bottom-start",
    "top-end",
    "bottom-end",
  ],
  flipPadding = 8,
  PaperProps,
}: ControlledBubbleMenuProps) {
  const { classes, cx } = useStyles(undefined, {
    props: { classes: overrideClasses },
  });
  const theme = useTheme();

  const defaultAnchorEl = useCallback(() => {
    const { ranges } = editor.state.selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    return {
      getBoundingClientRect: () => {
        if (isNodeSelection(editor.state.selection)) {
          const node = editor.view.nodeDOM(from);

          if (node instanceof HTMLElement) {
            return node.getBoundingClientRect();
          }
        }

        return posToDOMRect(editor.view, from, to);
      },
    };
  }, [editor]);

  return (
    <Popper
      open={open}
      placement={placement}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 6],
          },
        },
        {
          name: "flip",
          enabled: true,
          options: {
            boundary: editor.options.element,
            fallbackPlacements,
            padding: flipPadding,
          },
        },
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            altAxis: true,
            boundary: "clippingParents",
            padding: 8,
          },
        },
      ]}
      anchorEl={anchorEl ?? defaultAnchorEl}
      className={cx(controlledBubbleMenuClasses.root, classes.root, className)}
      container={container}
      disablePortal={disablePortal}
      transition
    >
      {({ TransitionProps }) => (
        <Fade
          {...TransitionProps}
          timeout={{
            enter: theme.transitions.duration.enteringScreen,

            exit: 0,
          }}
        >
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
      )}
    </Popper>
  );
}
