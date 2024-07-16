import type { PopperProps } from "@mui/material";
import { useState, type ReactNode } from "react";
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";
import { Maybe } from "api/graphql/generated/graphql";

import FormatColorBar from "../icons/format-color-bar";
import type { ColorPickerProps, SwatchColorOption } from "./color-picker";
import { ColorPickerPopper } from "./color-picker-popper";
import MenuButton, {
  MENU_BUTTON_FONT_SIZE_DEFAULT,
  type MenuButtonProps,
} from "./menu-button";

export interface MenuButtonColorPickerProps
  extends Except<MenuButtonProps, "color" | "value" | "onChange"> {
  value: string | undefined;
  onChange: (newColor: string) => void;
  swatchColors?: SwatchColorOption[];
  hideColorIndicator?: boolean;
  PopperProps?: Partial<PopperProps>;
  ColorPickerProps?: Partial<ColorPickerProps>;
  popperId?: string;
  labels?: {
    removeColorButton?: ReactNode;
    removeColorButtonTooltipTitle?: ReactNode;
    cancelButton?: ReactNode;
    saveButton?: ReactNode;
    textFieldPlaceholder?: string;
  };
}

const useStyles = makeStyles({ name: { MenuButtonColorPicker } })((theme) => ({
  menuButtonIcon: {
    fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
  },

  colorIndicatorIcon: {
    position: "absolute",
  },

  colorIndicatorIconDisabled: {
    color: theme.palette.action.disabled,
  },
}));

export function MenuButtonColorPicker({
  value: colorValue,
  onChange,
  swatchColors,
  labels,
  hideColorIndicator = false,
  popperId,
  PopperProps,
  ColorPickerProps,
  ...menuButtonProps
}: MenuButtonColorPickerProps) {
  const { classes, cx } = useStyles();
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLElement>>(null);

  const handleClose = () => setAnchorEl(null);

  const { IconComponent, children, ...otherMenuButtonProps } = menuButtonProps;

  return (
    <>
      <MenuButton
        onClick={(e) =>
          anchorEl ? handleClose() : setAnchorEl(e.currentTarget)
        }
        aria-describedby={popperId}
        {...otherMenuButtonProps}
      >
        {children ?? (
          <>
            {IconComponent && (
              <IconComponent className={classes.menuButtonIcon} />
            )}

            {!hideColorIndicator && colorValue && (
              <FormatColorBar
                className={cx(
                  classes.menuButtonIcon,
                  classes.colorIndicatorIcon,
                  menuButtonProps.disabled && classes.colorIndicatorIconDisabled
                )}
                style={
                  menuButtonProps.disabled ? undefined : { color: colorValue }
                }
              />
            )}
          </>
        )}
      </MenuButton>

      <ColorPickerPopper
        id={popperId}
        open={!!anchorEl}
        anchorEl={anchorEl}
        value={colorValue ?? ""}
        onSave={(newColor) => {
          onChange(newColor);
          handleClose();
        }}
        onCancel={handleClose}
        swatchColors={swatchColors}
        ColorPickerProps={ColorPickerProps}
        labels={labels}
        {...PopperProps}
      />
    </>
  );
}
