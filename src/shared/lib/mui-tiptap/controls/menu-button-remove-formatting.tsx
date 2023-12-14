import FormatClear from "@mui/icons-material/FormatClear";

import { useRichTextEditorContext } from "../context";
import MenuButton, { type MenuButtonProps } from "./menu-button";

export type MenuButtonRemoveFormattingProps = Partial<MenuButtonProps>;

export default function MenuButtonRemoveFormatting(
  props: MenuButtonRemoveFormattingProps
) {
  const editor = useRichTextEditorContext();
  return (
    <MenuButton
      tooltipLabel="Remove inline formatting"
      IconComponent={FormatClear}
      disabled={!editor?.isEditable || !editor.can().unsetAllMarks()}
      onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      {...props}
    />
  );
}
