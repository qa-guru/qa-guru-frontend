import { type EditorOptions, Node, mergeAttributes } from "@tiptap/core";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { FontFamily } from "@tiptap/extension-font-family";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Highlight } from "@tiptap/extension-highlight";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { Mention } from "@tiptap/extension-mention";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Strike } from "@tiptap/extension-strike";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Text } from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { useMemo } from "react";
import {
  LinkBubbleMenuHandler,
  FontSize,
  TableImproved,
  ResizableImage,
} from "shared/lib/mui-tiptap/extensions";
import { HeadingWithAnchor } from "shared/lib/mui-tiptap/hooks";
import { common, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import { mentionSuggestionOptions } from "../editor/utils/mention-suggestion-options";

const lowlight = createLowlight(common);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Iframe = Node.create({
  name: "iframe",

  addOptions() {
    return {
      allowFullscreen: true,
    };
  },

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      frameborder: { default: 0 },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "iframe-container" },
      ["iframe", mergeAttributes(HTMLAttributes)],
    ];
  },
});

export type UseExtensionsOptions = {
  placeholder?: string;
};

const CustomLinkExtension = Link.extend({
  inclusive: false,
});

const CustomSubscript = Subscript.extend({
  excludes: "superscript",
});

const CustomSuperscript = Superscript.extend({
  excludes: "subscript",
});

const CustomYoutube = Youtube.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "iframe-container" },
      ["iframe", mergeAttributes(HTMLAttributes)],
    ];
  },
});

export default function useExtensions({
  placeholder,
}: UseExtensionsOptions = {}): EditorOptions["extensions"] {
  return useMemo(() => {
    return [
      TableImproved.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      BulletList,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Document,
      HardBreak,
      ListItem,
      OrderedList,
      Paragraph,
      CustomSubscript,
      CustomSuperscript,
      Text,

      Bold,
      Blockquote,

      Italic,
      Underline,
      Strike,
      CustomLinkExtension.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: false,
      }),
      LinkBubbleMenuHandler,

      Gapcursor,
      HeadingWithAnchor,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      HorizontalRule,

      ResizableImage,

      Dropcursor,

      TaskList,
      TaskItem.configure({
        nested: true,
      }),

      Mention.configure({
        suggestion: mentionSuggestionOptions,
      }),

      Placeholder.configure({
        placeholder,
      }),

      Iframe,

      CustomYoutube.configure({
        inline: false,
        allowFullscreen: false,
      }),

      History,
    ];
  }, [placeholder]);
}
