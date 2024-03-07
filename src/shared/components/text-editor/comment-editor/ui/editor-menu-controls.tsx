import {
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonEmoji,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuButtonYoutube,
  MenuControlsContainer,
  MenuDivider,
} from "shared/lib/mui-tiptap/controls";
import useResponsive from "shared/hooks/use-responsive";

export default function EditorMenuControls() {
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
