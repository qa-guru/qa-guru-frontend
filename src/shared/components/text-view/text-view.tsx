import { RichTextReadOnly } from "mui-tiptap";
import { FC } from "react";

import useExtensions from "../../hooks/use-extensions";

type Maybe<T> = T | undefined | null;

interface TextViewProps {
  content: Maybe<string>;
}

const TextView: FC<TextViewProps> = ({ content }) => {
  const extensions = useExtensions();

  return <RichTextReadOnly content={content} extensions={extensions} />;
};

export default TextView;
