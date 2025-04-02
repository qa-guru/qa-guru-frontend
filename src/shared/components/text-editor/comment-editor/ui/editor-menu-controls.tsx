import {
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonEmoji,
  MenuButtonFileUpload,
  MenuButtonImageUpload,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuButtonYoutube,
  MenuControlsContainer,
  MenuDivider,
} from "shared/lib/mui-tiptap/controls";
import { useResponsive } from "shared/hooks";
import { Maybe } from "api/graphql/generated/graphql";

interface EditorMenuControlsProps {
  homeWorkId?: Maybe<string>;
  onUploadImageFiles: (files: File[]) => any;
  onUploadFiles: (files: File[]) => any;
}

export default function EditorMenuControls({
  onUploadImageFiles,
  onUploadFiles,
}: EditorMenuControlsProps) {
  const { isDesktop } = useResponsive();

  return (
    <MenuControlsContainer>
      <MenuButtonEditLink />

      <MenuDivider />

      <MenuButtonCodeBlock />

      <MenuDivider />

      <MenuDivider />

      <MenuButtonYoutube />

      <MenuDivider />

      <MenuButtonImageUpload
        onUploadFiles={onUploadImageFiles}
        tooltipLabel="Upload images"
      />
      <MenuButtonFileUpload
        onUploadFiles={onUploadFiles}
        tooltipLabel="Upload files"
      />

      <MenuButtonEmoji />

      {isDesktop && (
        <>
          <MenuDivider />
          <MenuButtonUndo />
          <MenuButtonRedo />
        </>
      )}
    </MenuControlsContainer>
  );
}
