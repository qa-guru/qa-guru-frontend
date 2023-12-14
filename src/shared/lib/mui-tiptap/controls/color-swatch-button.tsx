import Check from "@mui/icons-material/Check";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";

export interface ColorSwatchButtonProps
  extends Except<ComponentPropsWithoutRef<"button">, "color"> {
  value?: string;
  label?: string;
  active?: boolean;
  padding?: string | number;
}

export const ColorSwatchButton = forwardRef<
  ElementRef<"button">,
  ColorSwatchButtonProps
>(({ value: colorValue, label, padding, active, ...buttonProps }, ref) => {
  const { classes, cx, theme } = useStyles();
  return (
    <button
      ref={ref}
      type="button"
      style={{ backgroundColor: colorValue, padding }}
      aria-label={label ?? colorValue}
      value={colorValue}
      {...buttonProps}
      className={cx(
        classes.root,
        !colorValue && classes.colorNotSet,
        buttonProps.className
      )}
    >
      {active && (
        <Check
          fontSize="small"
          className={classes.activeIcon}
          style={{
            color: colorValue
              ? theme.palette.getContrastText(colorValue)
              : undefined,
          }}
        />
      )}
    </button>
  );
});

const useStyles = makeStyles({ name: { ColorSwatchButton } })((theme) => ({
  root: {
    height: theme.spacing(2.5),
    width: theme.spacing(2.5),
    minWidth: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[400],
    borderStyle: "solid",
    borderWidth: 1,
    cursor: "pointer",
    padding: 0,
    backgroundClip: "content-box",
  },

  activeIcon: {
    height: "100%",
    width: "80%",
    verticalAlign: "middle",
  },

  colorNotSet: {
    background: `repeating-conic-gradient(
      ${theme.palette.grey[400]} 0% 25%, ${theme.palette.common.white} 0% 50%)
      50% / 12px 12px`,
    backgroundClip: "content-box",
  },
}));

ColorSwatchButton.displayName = "ColorSwatchButton";
