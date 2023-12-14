import LinkIcon from "@mui/icons-material/Link";
import {
  getText,
  getTextSerializersFromSchema,
  type NodeViewProps,
} from "@tiptap/core";
import type { Heading, Level } from "@tiptap/extension-heading";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useMemo } from "react";
import { makeStyles } from "tss-react/mui";

import { getUtilityClasses } from "../styles";
import slugify from "../utils/slugify";

export interface HeadingNodeAttributes extends Record<string, unknown> {
  level: Level;
}

interface HeadingNode extends ProseMirrorNode {
  attrs: HeadingNodeAttributes;
}

interface Props extends NodeViewProps {
  node: HeadingNode;
  extension: typeof Heading;
}

const useStyles = makeStyles<void, "link">({
  name: { HeadingWithAnchorComponent },
  uniqId: "kNc4LD",
})((theme, _params, classes) => ({
  root: {
    [`&:hover .${classes.link}`]: {
      opacity: 100,
    },
  },

  container: {
    display: "inline-block",

    position: "relative",
  },

  link: {
    position: "absolute",
    left: -21,
    color: `${theme.palette.text.secondary} !important`,
    opacity: 0,
    transition: theme.transitions.create("opacity"),
    textDecoration: "none",
    outline: "none",

    [theme.breakpoints.down("sm")]: {
      left: -18,
    },

    '.ProseMirror[contenteditable="true"] &': {
      display: "none",
    },
  },

  linkIcon: {
    transform: "rotate(-45deg)",

    fontSize: "1.25rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem",
    },
  },
}));

export type HeadingWithAnchorComponentClasses = ReturnType<
  typeof useStyles
>["classes"];

const headingWithAnchorComponentClasses: HeadingWithAnchorComponentClasses =
  getUtilityClasses("HeadingWithAnchorComponent", [
    "root",
    "container",
    "link",
    "linkIcon",
  ]);

export default function HeadingWithAnchorComponent({
  editor,
  node,
  extension,
}: Props) {
  const { classes, cx } = useStyles();

  const hasLevel = extension.options.levels.includes(node.attrs.level);
  const level = hasLevel ? node.attrs.level : extension.options.levels[0];
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const textSerializers = useMemo(
    () => getTextSerializersFromSchema(editor.schema),
    [editor.schema]
  );
  const headingId = slugify(
    getText(node, {
      textSerializers,
    })
  );

  return (
    <NodeViewWrapper
      as={HeadingTag}
      id={headingId}
      {...extension.options.HTMLAttributes}
      className={cx(headingWithAnchorComponentClasses.root, classes.root)}
      style={{ textAlign: node.attrs.textAlign }}
    >
      <span
        className={cx(
          headingWithAnchorComponentClasses.container,
          classes.container
        )}
      >
        <a
          href={`#${headingId}`}
          contentEditable={false}
          className={cx(headingWithAnchorComponentClasses.link, classes.link)}
        >
          <LinkIcon
            className={cx(
              headingWithAnchorComponentClasses.linkIcon,
              classes.linkIcon
            )}
          />
        </a>
        <NodeViewContent as="span" />
      </span>
    </NodeViewWrapper>
  );
}
