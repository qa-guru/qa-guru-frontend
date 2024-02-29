import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { RefObject } from "react";
import { RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Maybe } from "api/graphql/generated/graphql";

export type MentionSuggestion = {
  id: string;
  mentionLabel: string;
};

export type SuggestionListRef = {
  onKeyDown: NonNullable<
    ReturnType<
      NonNullable<SuggestionOptions<MentionSuggestion>["render"]>
    >["onKeyDown"]
  >;
};

export type SuggestionListProps = SuggestionProps<MentionSuggestion>;

export interface ITextEditor {
  rteRef: RefObject<RichTextEditorRef>;
  content?: Maybe<string>;
}
