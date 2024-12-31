import { useTheme } from "@mui/material";

import { isTouchDevice } from "shared/lib/mui-tiptap/utils";
import {
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonImageUpload,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontFamily,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  MenuButtonYoutube,
  MenuButtonEmoji,
  MenuButtonFileUpload,
} from "shared/lib/mui-tiptap/controls";
import { Maybe } from "api/graphql/generated/graphql";

interface EditorMenuControlsProps {
  homeWorkId?: Maybe<string>;
  onUploadImageFiles: (files: File[]) => Promise<any>;
  onUploadFiles: (files: File[]) => Promise<any>;
}

export default function EditorMenuControls({
  onUploadImageFiles,
  onUploadFiles,
}: EditorMenuControlsProps) {
  const theme = useTheme();

  return (
    <MenuControlsContainer>
      <MenuSelectFontFamily
        options={[
          { label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
          { label: "Cursive", value: "cursive" },
          { label: "Monospace", value: "monospace" },
          { label: "Serif", value: "serif" },
        ]}
      />

      <MenuDivider />

      <MenuSelectHeading />

      <MenuDivider />

      <MenuSelectFontSize />

      <MenuDivider />

      <MenuButtonBold />

      <MenuButtonItalic />

      <MenuButtonUnderline />

      <MenuButtonStrikethrough />

      <MenuButtonSubscript />

      <MenuButtonSuperscript />

      <MenuDivider />

      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: theme.palette.editor.black, label: "Black" },
          { value: theme.palette.editor.white, label: "White" },
          { value: theme.palette.editor.grey, label: "Grey" },
          { value: theme.palette.editor.red, label: "Red" },
          { value: theme.palette.editor.orange, label: "Orange" },
          { value: theme.palette.editor.yellow, label: "Yellow" },
          { value: theme.palette.editor.green, label: "Green" },
          { value: theme.palette.editor.blue, label: "Blue" },
        ]}
      />

      <MenuButtonHighlightColor
        swatchColors={[
          { value: theme.palette.highlight.darkGrey, label: "Dark grey" },
          { value: theme.palette.highlight.lightGrey, label: "Light grey" },
          { value: theme.palette.highlight.lightRed, label: "Light red" },
          { value: theme.palette.highlight.lightOrange, label: "Light orange" },

          { value: theme.palette.highlight.yellow, label: "Yellow" },
          { value: theme.palette.highlight.lightGreen, label: "Light green" },
          { value: theme.palette.highlight.lightBlue, label: "Light blue" },
          { value: theme.palette.highlight.lightPurple, label: "Light purple" },
        ]}
      />

      <MenuDivider />

      <MenuButtonEditLink />

      <MenuDivider />

      <MenuSelectTextAlign />

      <MenuDivider />

      <MenuButtonOrderedList />

      <MenuButtonBulletedList />

      <MenuButtonTaskList />

      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />

      <MenuButtonBlockquote />

      <MenuDivider />

      <MenuButtonCodeBlock />

      <MenuDivider />

      <MenuButtonImageUpload
        onUploadFiles={onUploadImageFiles}
        tooltipLabel="Upload images"
      />
      <MenuButtonFileUpload
        onUploadFiles={onUploadFiles}
        tooltipLabel="Upload files"
      />

      <MenuDivider />

      <MenuButtonHorizontalRule />

      <MenuButtonAddTable />

      <MenuDivider />

      <MenuButtonRemoveFormatting />

      <MenuDivider />

      <MenuButtonYoutube />

      <MenuButtonEmoji />

      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
