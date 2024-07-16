/// <reference types="@tiptap/extension-highlight" />
import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import FormatInkHighlighterNoBar from "../icons/formatInk-highlighter-no-bar";
import {
  MenuButtonColorPicker,
  type MenuButtonColorPickerProps,
} from "./menu-button-color-picker";

export interface MenuButtonHighlightColorProps
  extends Partial<MenuButtonColorPickerProps> {
  defaultMarkColor?: string;
}

export default function MenuButtonHighlightColor({
  defaultMarkColor = "#ffff00",
  ...menuButtonProps
}: MenuButtonHighlightColorProps) {
  const editor = useRichTextEditorContext();
  const currentHighlightColor = editor?.isActive("highlight")
    ? (editor.getAttributes("highlight").color as Maybe<string | undefined>) ||
      defaultMarkColor
    : "";
  return (
    <MenuButtonColorPicker
      IconComponent={FormatInkHighlighterNoBar}
      tooltipLabel="Highlight color"
      tooltipShortcutKeys={["mod", "Shift", "H"]}
      value={currentHighlightColor}
      onChange={(newColor) => {
        if (newColor) {
          editor?.chain().focus().setHighlight({ color: newColor }).run();
        } else {
          editor?.chain().focus().unsetHighlight().run();
        }
      }}
      disabled={!editor?.isEditable || !editor.can().toggleHighlight()}
      {...menuButtonProps}
      labels={{
        removeColorButton: "None",
        removeColorButtonTooltipTitle: "Remove highlighting from this text",
        ...menuButtonProps.labels,
      }}
    />
  );
}
