import FormatSize from "@mui/icons-material/FormatSize";
import { MenuItem } from "@mui/material";
import type { Editor } from "@tiptap/core";
import type { ReactNode } from "react";
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";

import { useRichTextEditorContext } from "../context";
import type { FontSizeAttrs } from "../extensions/font-size";
import { getAttributesForEachSelected } from "../utils/get-attributes-for-each-selected";
import { MENU_BUTTON_FONT_SIZE_DEFAULT } from "./menu-button";
import MenuSelect, { type MenuSelectProps } from "./menu-select";

export type FontSizeSelectOptionObject = {
  value: string;
  label?: ReactNode;
};

export type FontSizeSelectOption = string | FontSizeSelectOptionObject;

export interface MenuSelectFontSizeProps
  extends Except<MenuSelectProps<string>, "value" | "children"> {
  options?: FontSizeSelectOption[];
  sizeOptions?: string[];
  unsetOptionLabel?: ReactNode;
  unsetOptionContent?: ReactNode;
  hideUnsetOption?: boolean;
  emptyLabel?: React.ReactNode;
  emptyValue?: React.ReactNode;
}

const useStyles = makeStyles({ name: { MenuSelectFontSize } })({
  selectInput: {
    width: 17,

    display: "flex",
    alignItems: "center",
  },

  fontSizeIcon: {
    fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
  },
});

const DEFAULT_FONT_SIZE_SELECT_OPTIONS: MenuSelectFontSizeProps["options"] = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "24px",
  "30px",
  "36px",
  "48px",
  "60px",
  "72px",
  "96px",
];

interface TextStyleAttrs
  extends ReturnType<Editor["getAttributes"]>,
    FontSizeAttrs {}

function stripPxFromValue(value: string): string {
  return value.replace("px", "");
}

const MULTIPLE_SIZES_SELECTED_VALUE = "MULTIPLE";

export default function MenuSelectFontSize({
  options = DEFAULT_FONT_SIZE_SELECT_OPTIONS,
  sizeOptions,
  hideUnsetOption = false,
  unsetOptionLabel = "Default",
  unsetOptionContent,
  emptyLabel,
  emptyValue,
  ...menuSelectProps
}: MenuSelectFontSizeProps) {
  const { classes, cx } = useStyles();
  const editor = useRichTextEditorContext();

  emptyLabel = emptyValue ?? emptyLabel;
  unsetOptionLabel = unsetOptionContent ?? unsetOptionLabel;
  options = sizeOptions ?? options;
  const optionObjects: FontSizeSelectOptionObject[] = (options ?? []).map(
    (option) => (typeof option === "string" ? { value: option } : option)
  );

  const allCurrentTextStyleAttrs: TextStyleAttrs[] = editor
    ? getAttributesForEachSelected(editor.state, "textStyle")
    : [];
  const isTextStyleAppliedToEntireSelection = !!editor?.isActive("textStyle");
  const currentFontSizes: string[] = allCurrentTextStyleAttrs.map(
    (attrs) => attrs.fontSize ?? ""
  );
  if (!isTextStyleAppliedToEntireSelection) {
    currentFontSizes.push("");
  }
  const numUniqueCurrentFontSizes = new Set(currentFontSizes).size;

  let currentFontSize;
  if (numUniqueCurrentFontSizes === 1) {
    currentFontSize = currentFontSizes[0];
  } else if (numUniqueCurrentFontSizes > 1) {
    currentFontSize = MULTIPLE_SIZES_SELECTED_VALUE;
  } else {
    currentFontSize = "";
  }

  return (
    <MenuSelect<string>
      onChange={(event) => {
        const { value } = event.target;
        if (value) {
          editor?.chain().setFontSize(value).focus().run();
        } else {
          editor?.chain().unsetFontSize().focus().run();
        }
      }}
      disabled={!editor?.isEditable || !editor.can().setFontSize("12px")}
      renderValue={(value) => {
        if (!value || value === MULTIPLE_SIZES_SELECTED_VALUE) {
          return emptyLabel ?? <FormatSize className={classes.fontSizeIcon} />;
        }
        return stripPxFromValue(value);
      }}
      displayEmpty
      aria-label="Font sizes"
      tooltipTitle="Font size"
      {...menuSelectProps}
      value={currentFontSize || ""}
      inputProps={{
        ...menuSelectProps.inputProps,
        className: cx(
          classes.selectInput,
          menuSelectProps.inputProps?.className
        ),
      }}
    >
      {!hideUnsetOption && <MenuItem value="">{unsetOptionLabel}</MenuItem>}

      <MenuItem
        style={{ display: "none" }}
        value={MULTIPLE_SIZES_SELECTED_VALUE}
      />

      {optionObjects.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label ?? stripPxFromValue(option.value)}
        </MenuItem>
      ))}
    </MenuSelect>
  );
}
