import {
  InputRule,
  mergeAttributes,
  type ExtendedRegExpMatchArray,
} from "@tiptap/core";
import { Image, type ImageOptions } from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Maybe } from "api/graphql/generated/graphql";

import ResizableImageComponent from "./resizable-image-component";

export type ResizableImageOptions = ImageOptions & {
  isAllowedImgSrc(src: Maybe<string>): boolean;
};

const ResizableImage = Image.extend<ResizableImageOptions>({
  addOptions() {
    return {
      ...this.parent?.(),

      isAllowedImgSrc: (src: Maybe<string>) => {
        return !!src;
      },
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: null,

        renderHTML: (attributes) => ({
          width: attributes.width as string | number | undefined,
        }),
        parseHTML: (element) => element.getAttribute("width"),
      },

      aspectRatio: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.aspectRatio) {
            return {};
          }

          return {
            style: `aspect-ratio: ${attributes.aspectRatio as string}`,
          };
        },
        parseHTML: (element) => element.style.aspectRatio,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(
        {
          height: "auto",
        },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
    ];
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? "img[src]"
          : 'img[src]:not([src^="data:"])',

        getAttrs: (node) => {
          if (!(node instanceof Element)) {
            return false;
          }

          const src = node.getAttribute("src");
          return this.options.isAllowedImgSrc(src) && null;
        },
      },
    ];
  },

  addInputRules() {
    const parentInputRules = this.parent?.();
    if (!parentInputRules) {
      return [];
    }

    const getAttributes = (match: ExtendedRegExpMatchArray) => {
      const [, , alt, src, title] = match;
      return { src, alt, title };
    };

    return parentInputRules.map(
      (rule) =>
        new InputRule({
          find: rule.find,
          handler: (props) => {
            const attributes = getAttributes(props.match);
            if (!this.options.isAllowedImgSrc(attributes.src)) {
              return;
            }

            // eslint-disable-next-line consistent-return
            return rule.handler(props);
          },
        })
    );
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

export default ResizableImage;
