import {
  ToggleButton,
  toggleButtonClasses,
  type ToggleButtonProps,
} from "@mui/material";
import type { ReactNode, RefObject } from "react";
import { makeStyles } from "tss-react/mui";
import type { Except, SetOptional } from "type-fest";

import MenuButtonTooltip, {
  type MenuButtonTooltipProps,
} from "./menu-button-tooltip";

export interface MenuButtonProps
  extends SetOptional<Except<ToggleButtonProps, "ref" | "children">, "value"> {
  tooltipLabel: MenuButtonTooltipProps["label"];
  tooltipShortcutKeys?: MenuButtonTooltipProps["shortcutKeys"];
  IconComponent?: React.ElementType<{ className: string }>;
  children?: ReactNode;
  buttonRef?: RefObject<HTMLButtonElement>;
}

export const MENU_BUTTON_FONT_SIZE_DEFAULT = "1.25rem";

const useStyles = makeStyles({ name: { MenuButton } })({
  root: {
    [`&& .${toggleButtonClasses.root}`]: {
      border: "none",
      padding: 5,
    },
  },

  menuButtonIcon: {
    fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
  },
});

export default function MenuButton({
  tooltipLabel,
  tooltipShortcutKeys,
  IconComponent,
  buttonRef,
  children,
  ...toggleButtonProps
}: MenuButtonProps) {
  const { classes } = useStyles();
  return (
    <span className={classes.root}>
      <MenuButtonTooltip
        label={tooltipLabel}
        shortcutKeys={tooltipShortcutKeys}
      >
        <ToggleButton
          ref={buttonRef}
          size="small"
          value={tooltipLabel}
          {...toggleButtonProps}
        >
          {children ??
            (IconComponent && (
              <IconComponent className={classes.menuButtonIcon} />
            ))}
        </ToggleButton>
      </MenuButtonTooltip>
    </span>
  );
}
