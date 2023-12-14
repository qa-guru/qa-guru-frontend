import { Collapse } from "@mui/material";
import { makeStyles } from "tss-react/mui";

import { Z_INDEXES, getUtilityClasses } from "../styles";

export type MenuBarClasses = ReturnType<typeof useStyles>["classes"];

export type MenuBarProps = {
  hide?: boolean;

  disableSticky?: boolean;

  stickyOffset?: number;
  children?: React.ReactNode;
  className?: string;
  classes?: Partial<MenuBarClasses>;
};

const menuBarClasses: MenuBarClasses = getUtilityClasses("MenuBar", [
  "root",
  "sticky",
  "nonSticky",
  "content",
]);

const useStyles = makeStyles<{ stickyOffset?: number }>({
  name: { MenuBar },
})((theme, { stickyOffset }) => {
  return {
    root: {
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
    },

    sticky: {
      position: "sticky",
      top: stickyOffset ?? 0,
      zIndex: Z_INDEXES.MENU_BAR,
      background: theme.palette.background.default,
    },

    nonSticky: {},

    content: {},
  };
});

export default function MenuBar({
  hide,
  disableSticky,
  stickyOffset,
  children,
  className,
  classes: overrideClasses,
}: MenuBarProps) {
  const { classes, cx } = useStyles(
    { stickyOffset },
    {
      props: { classes: overrideClasses },
    }
  );
  return (
    <Collapse
      in={!hide}
      unmountOnExit
      className={cx(
        menuBarClasses.root,
        classes.root,
        disableSticky
          ? [menuBarClasses.nonSticky, classes.nonSticky]
          : [menuBarClasses.sticky, classes.sticky],
        className
      )}
    >
      <div className={classes.content}>{children}</div>
    </Collapse>
  );
}
