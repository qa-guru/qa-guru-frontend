import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { allowedVideoSrc, classifyVideoSrc } from "./video-src";
import VideoEmbedView from "./video-embed-view";

function videoAttrsFromSrc(src: string | null) {
  const allowed = allowedVideoSrc(src);

  if (!allowed) {
    return false as const;
  }

  if (classifyVideoSrc(allowed) === "youtube") {
    return { youtube: allowed, rutube: null };
  }

  return { youtube: null, rutube: allowed };
}

const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  isolating: true,
  draggable: false,
  priority: 1000,

  addAttributes() {
    return {
      youtube: {
        default: null,
      },
      rutube: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video-embed",
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) {
            return false;
          }

          const youtube = allowedVideoSrc(el.getAttribute("youtube"));
          const rutube = allowedVideoSrc(el.getAttribute("rutube"));

          if (!youtube && !rutube) {
            return false;
          }

          return { youtube, rutube };
        },
      },
      {
        tag: "iframe",
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) {
            return false;
          }

          return videoAttrsFromSrc(el.getAttribute("src"));
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["video-embed", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoEmbedView);
  },
});

export default VideoEmbed;
