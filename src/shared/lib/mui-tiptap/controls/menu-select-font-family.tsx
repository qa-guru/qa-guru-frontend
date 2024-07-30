/// <reference types="@tiptap/extension-font-family" />
import { MenuItem } from "@mui/material";
import type { Editor } from "@tiptap/core";
import type { ReactNode } from "react";
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";

import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import { getAttributesForEachSelected } from "../utils/get-attributes-for-each-selected";
import MenuSelect, { type MenuSelectProps } from "./menu-select";

export type FontFamilySelectOption = {
  value: string;
  label?: ReactNode;
};

export interface MenuSelectFontFamilyProps
  extends Except<MenuSelectProps<string>, "value" | "children"> {
  options: FontFamilySelectOption[];
  unsetOptionLabel?: React.ReactNode;
  hideUnsetOption?: boolean;
  emptyLabel?: React.ReactNode;
}

const useStyles = makeStyles({ name: { MenuSelectFontFamily } })({
  selectInput: {
    width: 55,
  },
});

interface TextStyleAttrs extends ReturnType<Editor["getAttributes"]> {
  fontFamily?: Maybe<string>;
}

const MULTIPLE_FAMILIES_SELECTED_VALUE = "MULTIPLE";

export default function MenuSelectFontFamily({
  options,
  hideUnsetOption = false,
  unsetOptionLabel = "Default",
  emptyLabel = "Font",
  ...menuSelectProps
}: MenuSelectFontFamilyProps) {
  const { classes, cx } = useStyles();
  const editor = useRichTextEditorContext();

  const allCurrentTextStyleAttrs: TextStyleAttrs[] = editor
    ? getAttributesForEachSelected(editor.state, "textStyle")
    : [];
  const isTextStyleAppliedToEntireSelection = !!editor?.isActive("textStyle");
  const currentFontFamilies: string[] = allCurrentTextStyleAttrs.map(
    (attrs) => attrs.fontFamily ?? ""
  );
  if (!isTextStyleAppliedToEntireSelection) {
    currentFontFamilies.push("");
  }
  const numUniqueCurrentFontFamilies = new Set(currentFontFamilies).size;

  let currentFontFamily;
  if (numUniqueCurrentFontFamilies === 1) {
    currentFontFamily = currentFontFamilies[0];
  } else if (numUniqueCurrentFontFamilies > 1) {
    currentFontFamily = MULTIPLE_FAMILIES_SELECTED_VALUE;
  } else {
    currentFontFamily = "";
  }

  return (
    <MenuSelect<string>
      onChange={(event) => {
        const { value } = event.target;
        if (value) {
          editor?.chain().setFontFamily(value).focus().run();
        } else {
          editor?.chain().unsetFontFamily().focus().run();
        }
      }}
      disabled={!editor?.isEditable || !editor.can().setFontFamily("serif")}
      renderValue={(value) => {
        if (!value || value === MULTIPLE_FAMILIES_SELECTED_VALUE) {
          return emptyLabel;
        }
        return options.find((option) => option.value === value)?.label ?? value;
      }}
      displayEmpty
      aria-label="Font families"
      tooltipTitle="Font"
      {...menuSelectProps}
      value={currentFontFamily || ""}
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
        value={MULTIPLE_FAMILIES_SELECTED_VALUE}
      />

      {options.map((fontFamilyOption) => (
        <MenuItem key={fontFamilyOption.value} value={fontFamilyOption.value}>
          <span style={{ fontFamily: fontFamilyOption.value }}>
            {fontFamilyOption.label ?? fontFamilyOption.value}
          </span>
        </MenuItem>
      ))}
    </MenuSelect>
  );
}
