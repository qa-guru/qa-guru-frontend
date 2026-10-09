import type { ComponentProps } from "react";

import {
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonEmoji,
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
  onUploadImageFiles: ComponentProps<
    typeof MenuButtonImageUpload
  >["onUploadFiles"];
}

export default function EditorMenuControls({
  onUploadImageFiles,
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
