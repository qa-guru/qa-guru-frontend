import {
  Button,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Stack,
  Tooltip,
  type PopperProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { Z_INDEXES } from "../styles";
import { ColorPicker } from "./color-picker";
import type { MenuButtonColorPickerProps } from "./menu-button-color-picker";

export interface ColorPickerPopperBodyProps
  extends Pick<
    MenuButtonColorPickerProps,
    "swatchColors" | "labels" | "ColorPickerProps"
  > {
  value: string;
  onSave: (newColor: string) => void;
  onCancel: () => void;
}

export interface ColorPickerPopperProps
  extends PopperProps,
    ColorPickerPopperBodyProps {}

export function ColorPickerPopperBody({
  value,
  onCancel,
  onSave,
  swatchColors,
  labels = {},
  ColorPickerProps,
}: ColorPickerPopperBodyProps) {
  const {
    removeColorButton = "None",
    removeColorButtonTooltipTitle = "",
    cancelButton = "Cancel",
    saveButton = "OK",
  } = labels;

  const [localColor, setLocalColor] = useState<string>(value);
  useEffect(() => {
    setLocalColor(value);
  }, [value]);

  return (
    <>
      <ColorPicker
        swatchColors={swatchColors}
        value={localColor}
        onChange={(newColor) => {
          setLocalColor(newColor);
        }}
        labels={labels}
        {...ColorPickerProps}
      />

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        <Tooltip title={removeColorButtonTooltipTitle} arrow>
          <Button
            onClick={() => {
              onSave("");
            }}
            size="small"
          >
            {removeColorButton}
          </Button>
        </Tooltip>

        <Button onClick={onCancel} size="small">
          {cancelButton}
        </Button>

        <Button
          onClick={() => {
            onSave(localColor);
          }}
          size="small"
        >
          {saveButton}
        </Button>
      </Stack>
    </>
  );
}

const useStyles = makeStyles({ name: { ColorPickerPopper } })({
  root: {
    zIndex: Z_INDEXES.BUBBLE_MENU,
    width: 235,
  },
});

export function ColorPickerPopper({
  value,
  onSave,
  onCancel,
  swatchColors,
  ColorPickerProps,
  labels,
  ...popperProps
}: ColorPickerPopperProps) {
  const { classes, cx } = useStyles();
  return (
    <Popper
      transition
      placement="bottom-start"
      {...popperProps}
      className={cx(classes.root, popperProps.className)}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={100}>
          <div>
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={onCancel}
            >
              <Paper elevation={5} sx={{ p: 2.5, pb: 1 }}>
                <ColorPickerPopperBody
                  value={value || ""}
                  onSave={onSave}
                  onCancel={onCancel}
                  swatchColors={swatchColors}
                  ColorPickerProps={ColorPickerProps}
                  labels={labels}
                />
              </Paper>
            </ClickAwayListener>
          </div>
        </Fade>
      )}
    </Popper>
  );
}
