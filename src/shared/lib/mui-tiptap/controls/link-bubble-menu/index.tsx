/// <reference types="@tiptap/extension-link" />
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";

import ControlledBubbleMenu, {
  type ControlledBubbleMenuProps,
} from "../controlled-bubble-menu";
import { useRichTextEditorContext } from "../../context";
import {
  LinkMenuState,
  type LinkBubbleMenuHandlerStorage,
} from "../../extensions/link-bubble-menu-handler";
import EditLinkMenuContent, {
  type EditLinkMenuContentProps,
} from "./edit-link-menu-content";
import ViewLinkMenuContent, {
  type ViewLinkMenuContentProps,
} from "./view-link-menu-content";

export interface LinkBubbleMenuProps
  extends Partial<
    Except<ControlledBubbleMenuProps, "open" | "editor" | "children">
  > {
  labels?: ViewLinkMenuContentProps["labels"] &
    EditLinkMenuContentProps["labels"];
}

const useStyles = makeStyles({ name: { LinkBubbleMenu } })((theme) => ({
  content: {
    padding: theme.spacing(1.5, 2, 0.5),
  },
}));

export default function LinkBubbleMenu({
  labels,
  ...controlledBubbleMenuProps
}: LinkBubbleMenuProps) {
  const { classes } = useStyles();
  const editor = useRichTextEditorContext();

  if (!editor?.isEditable) {
    return null;
  }

  if (!("linkBubbleMenuHandler" in editor.storage)) {
    throw new Error(
      "You must add the LinkBubbleMenuHandler extension to the useEditor `extensions` array in order to use this component!"
    );
  }
  const handlerStorage = editor.storage
    .linkBubbleMenuHandler as LinkBubbleMenuHandlerStorage;

  const menuState = handlerStorage.state;

  let linkMenuContent = null;
  if (menuState === LinkMenuState.VIEW_LINK_DETAILS) {
    linkMenuContent = (
      <ViewLinkMenuContent
        editor={editor}
        onCancel={editor.commands.closeLinkBubbleMenu}
        onEdit={editor.commands.editLinkInBubbleMenu}
        onRemove={() => {
          editor
            .chain()
            .unsetLink()
            .setTextSelection(editor.state.selection.to)
            .focus()
            .run();
        }}
        labels={labels}
      />
    );
  } else if (menuState === LinkMenuState.EDIT_LINK) {
    linkMenuContent = (
      <EditLinkMenuContent
        editor={editor}
        onCancel={editor.commands.closeLinkBubbleMenu}
        onSave={({ text, link }) => {
          editor
            .chain()

            .extendMarkRange("link")
            .insertContent({
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: link,
                  },
                },
              ],
              text,
            })

            .setLink({
              href: link,
            })

            .focus()
            .run();

          editor.commands.closeLinkBubbleMenu();
        }}
        labels={labels}
      />
    );
  }

  return (
    <ControlledBubbleMenu
      editor={editor}
      open={menuState !== LinkMenuState.HIDDEN}
      {...handlerStorage.bubbleMenuOptions}
      {...controlledBubbleMenuProps}
    >
      <div className={classes.content}>{linkMenuContent}</div>
    </ControlledBubbleMenu>
  );
}
