import {
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonImageUpload,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuButtonYoutube,
  MenuButtonEmoji,
} from "shared/lib/mui-tiptap/controls";

export default function EditorMenuControls() {
  return (
    <MenuControlsContainer>
      <MenuButtonEditLink />

      <MenuDivider />

      <MenuButtonCodeBlock />

      <MenuDivider />

      <MenuButtonImageUpload
        onUploadFiles={(files) =>
          files.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
          }))
        }
      />

      <MenuDivider />

      <MenuButtonYoutube />

      <MenuButtonEmoji />

      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
