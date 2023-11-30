import { List, ListItem, ListItemButton, Paper } from "@mui/material";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { MentionSuggestion } from "../utils/mention-suggestion-options";

export type SuggestionListRef = {
  onKeyDown: NonNullable<
    ReturnType<
      NonNullable<SuggestionOptions<MentionSuggestion>["render"]>
    >["onKeyDown"]
  >;
};

interface MentionNodeAttrs {
  id: string | null;
  label?: string | null;
}

export type SuggestionListProps = SuggestionProps<MentionSuggestion>;

const SuggestionList = forwardRef<SuggestionListRef, SuggestionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      if (index >= props.items.length) {
        return;
      }

      const suggestion = props.items[index];

      const mentionItem: MentionNodeAttrs = {
        id: suggestion.id,
        label: suggestion.mentionLabel,
      };

      props.command(mentionItem);
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return props.items.length > 0 ? (
      <Paper elevation={5}>
        <List
          dense
          sx={{
            overflow: "hidden",
          }}
        >
          {props.items.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={index === selectedIndex}
                onClick={() => selectItem(index)}
              >
                {item.mentionLabel}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    ) : null;
  }
);

SuggestionList.displayName = "SuggestionList";

export default SuggestionList;
