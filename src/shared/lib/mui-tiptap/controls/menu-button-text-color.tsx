/// <reference types="@tiptap/extension-color" />
import type { Editor } from "@tiptap/core";

import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import FormatColorTextNoBar from "../icons/format-color-text-no-bar";
import { getAttributesForEachSelected } from "../utils/get-attributes-for-each-selected";
import {
  MenuButtonColorPicker,
  type MenuButtonColorPickerProps,
} from "./menu-button-color-picker";

export interface MenuButtonTextColorProps
  extends Partial<MenuButtonColorPickerProps> {
  defaultTextColor?: string;
}

interface TextStyleAttrs extends ReturnType<Editor["getAttributes"]> {
  color?: Maybe<string>;
}

export default function MenuButtonTextColor({
  IconComponent = FormatColorTextNoBar,
  tooltipLabel = "Text color",
  defaultTextColor = "",
  ...menuButtonProps
}: MenuButtonTextColorProps) {
  const editor = useRichTextEditorContext();

  const allCurrentTextStyleAttrs: TextStyleAttrs[] = editor
    ? getAttributesForEachSelected(editor.state, "textStyle")
    : [];
  const isTextStyleAppliedToEntireSelection = !!editor?.isActive("textStyle");
  const currentColors: string[] = allCurrentTextStyleAttrs.map(
    (attrs) => attrs.color || defaultTextColor
  );
  if (!isTextStyleAppliedToEntireSelection) {
    currentColors.push(defaultTextColor);
  }
  const numUniqueCurrentColors = new Set(currentColors).size;

  let currentColor;
  if (numUniqueCurrentColors === 1) {
    currentColor = currentColors[0];
  } else if (numUniqueCurrentColors > 1) {
    currentColor = "";
  } else {
    currentColor = defaultTextColor;
  }

  return (
    <MenuButtonColorPicker
      IconComponent={IconComponent}
      tooltipLabel={tooltipLabel}
      value={currentColor}
      onChange={(newColor) => {
        editor?.chain().focus().setColor(newColor).run();
      }}
      disabled={!editor?.isEditable || !editor.can().setColor("#000")}
      {...menuButtonProps}
      labels={{ removeColorButton: "Reset", ...menuButtonProps.labels }}
    />
  );
}
