import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";
import { makeStyles } from "tss-react/mui";
import { Maybe } from "api/graphql/generated/graphql";

import { colorToHex as colorToHexDefault } from "../utils/color";
import { ColorSwatchButton } from "./color-swatch-button";

export type ColorChangeSource = "gradient" | "text" | "swatch";

export type SwatchColorOptionObject = {
  value?: string;
  label?: string;
};

export type SwatchColorOption = string | SwatchColorOptionObject;

export type ColorPickerProps = {
  value: string;
  onChange: (color: string, source: ColorChangeSource) => void;
  colorToHex?: (color: string) => Maybe<string>;
  swatchColors?: SwatchColorOption[];
  disableAlpha?: boolean;
  labels?: {
    textFieldPlaceholder?: string;
  };
};

const useStyles = makeStyles({ name: { ColorPicker } })((theme) => ({
  gradientPicker: {
    "&&": {
      width: "100%",
    },
  },

  colorTextInput: {
    marginTop: theme.spacing(1),
  },

  swatchContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    marginTop: theme.spacing(1),
  },
}));

export function ColorPicker({
  value,
  onChange,
  swatchColors,
  colorToHex = colorToHexDefault,
  disableAlpha = false,
  labels = {},
}: ColorPickerProps) {
  const { classes } = useStyles();
  const { textFieldPlaceholder = 'Ex: "#7cb5ec"' } = labels;

  const inputRef = useRef<Maybe<HTMLInputElement>>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current !== document.activeElement) {
      inputRef.current.value = value;
    }
  }, [value]);

  const swatchColorObjects: SwatchColorOptionObject[] = (
    swatchColors ?? []
  ).map((swatchColor) =>
    typeof swatchColor === "string" ? { value: swatchColor } : swatchColor
  );

  const colorValueAsHex = colorToHex(value);
  return (
    <>
      {disableAlpha ? (
        <HexColorPicker
          color={colorValueAsHex ?? "#000000"}
          onChange={(color) => onChange(color, "gradient")}
          className={classes.gradientPicker}
        />
      ) : (
        <HexAlphaColorPicker
          color={colorValueAsHex ?? "#000000"}
          onChange={(color) => onChange(color, "gradient")}
          className={classes.gradientPicker}
        />
      )}

      <TextField
        placeholder={textFieldPlaceholder}
        variant="outlined"
        size="small"
        defaultValue={value || ""}
        inputRef={inputRef}
        spellCheck={false}
        className={classes.colorTextInput}
        onChange={(event) => {
          const newColor = event.target.value;
          const newHexColor = colorToHex(newColor);
          if (newHexColor) {
            onChange(newHexColor, "text");
          }
        }}
        fullWidth
      />

      {swatchColorObjects.length > 0 && (
        <div className={classes.swatchContainer}>
          {swatchColorObjects.map((swatchColor) => (
            <ColorSwatchButton
              key={swatchColor.value}
              value={swatchColor.value}
              label={swatchColor.label}
              onClick={() => onChange(swatchColor.value ?? "", "swatch")}
              active={
                swatchColor.value === value ||
                (!swatchColor.value && !value) ||
                (!!swatchColor.value &&
                  !!colorValueAsHex &&
                  colorToHex(swatchColor.value) === colorValueAsHex)
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
