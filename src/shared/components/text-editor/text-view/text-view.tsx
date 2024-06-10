import { FC, useMemo } from "react";
import { RichTextReadOnly } from "shared/lib/mui-tiptap";
import { Maybe } from "api/graphql/generated/graphql";
import { FormControl } from "@mui/material";

import useExtensions from "../hooks/use-extensions";

interface TextViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: Maybe<any>;
}

const convertTextToLinks = (content?: Maybe<string>) => {
  const regex = /(?<!<[^<>]*)\b(?:https?|www)\S*(?![^<>]*>)/g;
  let modifiedContent = content;

  if (content) {
    const matches = [...content.matchAll(regex)];
    let lastIndex = 0;
    const segments = [];

    matches.forEach((match) => {
      const matchStart = match.index;
      const matchEnd = Number(matchStart) + match[0].length;

      segments.push(content.substring(lastIndex, matchStart));

      segments.push(
        `<a style="word-break: break-all" href="${match[0]}" target="_blank" rel="noopener noreferrer">${match[0]}</a>`
      );

      lastIndex = matchEnd;
    });

    segments.push(content.substring(lastIndex));
    modifiedContent = segments.join("");
  }

  return modifiedContent;
};

const TextView: FC<TextViewProps> = ({ content }) => {
  const extensions = useExtensions();
  const modifiedContent = useMemo(() => convertTextToLinks(content), [content]);

  return (
    <FormControl sx={{ wordBreak: "break-word" }}>
      <RichTextReadOnly content={modifiedContent} extensions={extensions} />
    </FormControl>
  );
};

export default TextView;
