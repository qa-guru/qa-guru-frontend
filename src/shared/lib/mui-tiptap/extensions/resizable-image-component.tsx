import type { NodeViewProps } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { NodeViewWrapper } from "@tiptap/react";
import throttle from "lodash/throttle";
import { useMemo, useRef } from "react";
import { makeStyles } from "tss-react/mui";

import { Maybe } from "api/graphql/generated/graphql";

import { ResizableImageResizer } from "./resizable-image-resizer";

interface ImageNodeAttributes extends Record<string, unknown> {
  src: string;
  alt?: Maybe<string>;
  title?: Maybe<string>;
}

interface ResizableImageNodeAttributes extends ImageNodeAttributes {
  width: Maybe<string | number>;
  aspectRatio: Maybe<string>;
}

interface ResizableImageNode extends ProseMirrorNode {
  attrs: ResizableImageNodeAttributes;
}

interface Props extends NodeViewProps {
  node: ResizableImageNode;
}

const IMAGE_MINIMUM_WIDTH_PIXELS = 15;

const useStyles = makeStyles({ name: { ResizableImageComponent } })(
  (theme) => ({
    imageContainer: {
      display: "inline-block",

      position: "relative",
    },

    image: {
      display: "block",
    },

    imageSelected: {
      outline: `3px solid ${theme.palette.app.primary}`,
    },

    resizer: {
      '.ProseMirror[contenteditable="false"] &': {
        display: "none",
      },
    },
  })
);

function ResizableImageComponent({ node, selected, updateAttributes }: Props) {
  const { classes, cx } = useStyles();
  const { attrs } = node;

  const imageRef = useRef<Maybe<HTMLImageElement>>(null);

  const handleResize = useMemo(
    () =>
      throttle(
        (event: MouseEvent) => {
          if (!imageRef.current) {
            return;
          }

          const originalBoundingRect = imageRef.current.getBoundingClientRect();

          const resizedWidth = event.clientX - originalBoundingRect.x;
          const resizedHeight = event.clientY - originalBoundingRect.y;

          const resultantWidth = Math.max(
            resizedWidth,
            (originalBoundingRect.width / originalBoundingRect.height) *
              resizedHeight,

            IMAGE_MINIMUM_WIDTH_PIXELS
          );

          updateAttributes({
            width: Math.round(resultantWidth),
          });
        },
        50,
        { trailing: true }
      ),
    [updateAttributes]
  );

  return (
    <NodeViewWrapper
      style={{
        textAlign: attrs.textAlign,
        width: "100%",
      }}
    >
      <div className={classes.imageContainer}>
        <img
          ref={imageRef}
          src={attrs.src}
          height="auto"
          width={attrs.width ? attrs.width : undefined}
          {...{
            alt: attrs.alt || undefined,
            title: attrs.title || undefined,
          }}
          className={cx(
            classes.image,

            selected && "ProseMirror-selectednode",
            selected && classes.imageSelected
          )}
          style={{
            maxWidth: attrs.width ? undefined : "auto",

            aspectRatio: attrs.aspectRatio ?? undefined,
          }}
          data-drag-handle
          onLoad={(event) => {
            const newAttributes: Partial<ResizableImageNodeAttributes> = {};
            if (!attrs.width) {
              newAttributes.width = event.currentTarget.naturalWidth;
            }
            if (!attrs.aspectRatio) {
              newAttributes.aspectRatio = String(
                event.currentTarget.naturalWidth /
                  event.currentTarget.naturalHeight
              );
            }
            if (newAttributes.width || newAttributes.aspectRatio) {
              updateAttributes(newAttributes);
            }
          }}
        />

        {selected && (
          <ResizableImageResizer
            onResize={handleResize}
            className={classes.resizer}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
}

export default ResizableImageComponent;
