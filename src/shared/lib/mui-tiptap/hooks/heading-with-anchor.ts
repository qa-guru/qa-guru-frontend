import type { Editor } from "@tiptap/core";
import { Heading, type HeadingOptions } from "@tiptap/extension-heading";
import { ReactNodeViewRenderer } from "@tiptap/react";

import HeadingWithAnchorComponent from "./heading-with-anchor-component";

export type HeadingWithAnchorOptions = HeadingOptions & {
  scrollToAnchorOnMount: boolean;
};

const HeadingWithAnchor = Heading.extend<HeadingWithAnchorOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      scrollToAnchorOnMount: true,
    };
  },

  onCreate() {
    if (this.options.scrollToAnchorOnMount) {
      setTimeout(() => {
        scrollToCurrentHeadingAnchor(this.editor);
      });
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(HeadingWithAnchorComponent);
  },
});

export default HeadingWithAnchor;

export function scrollToCurrentHeadingAnchor(editor: Editor) {
  if (editor.isDestroyed || !("heading" in editor.storage)) {
    return;
  }

  const currentHash = window.location.hash;
  const elementId = currentHash.slice(1);
  if (!elementId) {
    return;
  }

  const elementForHash = window.document.getElementById(elementId);

  if (elementForHash && editor.options.element.contains(elementForHash)) {
    elementForHash.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
