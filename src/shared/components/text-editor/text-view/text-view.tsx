import { FC } from "react";
import { FormControl } from "@mui/material";

import { RichTextReadOnly } from "shared/lib/mui-tiptap";
import { Maybe } from "api/graphql/generated/graphql";

import useExtensions from "../hooks/use-extensions";
import { prepareReadOnlyHtml } from "./prepare-read-only-html";

interface TextViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: Maybe<any>;
}

const TextView: FC<TextViewProps> = ({ content }) => {
  const extensions = useExtensions({
    hideFileNodeView: true,
    readOnlyVideo: true,
  });
  const prepared =
    typeof content === "string" ? prepareReadOnlyHtml(content) : content;

  return (
    <FormControl sx={{ wordBreak: "break-word" }}>
      <RichTextReadOnly content={prepared} extensions={extensions} />
    </FormControl>
  );
};

export default TextView;
