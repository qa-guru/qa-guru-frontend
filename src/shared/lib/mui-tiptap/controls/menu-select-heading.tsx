/// <reference types="@tiptap/extension-paragraph" />
import { MenuItem, type SelectChangeEvent } from "@mui/material";
import type { Heading, Level } from "@tiptap/extension-heading";
import { useCallback, useMemo, type ReactNode } from "react";
import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";

import { useRichTextEditorContext } from "../context";
import { getEditorStyles } from "../styles";
import { getAttributesForEachSelected } from "../utils/get-attributes-for-each-selected";
import MenuButtonTooltip from "./menu-button-tooltip";
import MenuSelect, { type MenuSelectProps } from "./menu-select";

export interface MenuSelectHeadingProps
  extends Except<
    MenuSelectProps<HeadingOptionValue | "">,
    "value" | "children"
  > {
  labels?: {
    paragraph?: ReactNode;
    heading1?: ReactNode;
    heading2?: ReactNode;
    heading3?: ReactNode;
    heading4?: ReactNode;
    heading5?: ReactNode;
    heading6?: ReactNode;

    empty?: ReactNode;
    emptyValue?: React.ReactNode;
  };
}

const useStyles = makeStyles({ name: { MenuSelectHeading } })((theme) => {
  const editorStyles = getEditorStyles(theme);
  return {
    selectInput: {
      width: 77,
    },

    menuOption: {
      display: "block",
      width: "100%",
    },

    headingOption: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
      fontWeight: "bold",
    },

    headingOption1: {
      fontSize: editorStyles["& h1"].fontSize,
    },

    headingOption2: {
      fontSize: editorStyles["& h2"].fontSize,
    },

    headingOption3: {
      fontSize: editorStyles["& h3"].fontSize,
    },

    headingOption4: {
      fontSize: editorStyles["& h4"].fontSize,
    },

    headingOption5: {
      fontSize: editorStyles["& h5"].fontSize,
    },

    headingOption6: {
      fontSize: editorStyles["& h6"].fontSize,
    },
  };
});

const HEADING_OPTION_VALUES = {
  Paragraph: "Paragraph",
  Heading1: "Heading 1",
  Heading2: "Heading 2",
  Heading3: "Heading 3",
  Heading4: "Heading 4",
  Heading5: "Heading 5",
  Heading6: "Heading 6",
} as const;

export type HeadingOptionValue =
  (typeof HEADING_OPTION_VALUES)[keyof typeof HEADING_OPTION_VALUES];

const HEADING_OPTION_VALUE_TO_LEVEL = {
  [HEADING_OPTION_VALUES.Heading1]: 1,
  [HEADING_OPTION_VALUES.Heading2]: 2,
  [HEADING_OPTION_VALUES.Heading3]: 3,
  [HEADING_OPTION_VALUES.Heading4]: 4,
  [HEADING_OPTION_VALUES.Heading5]: 5,
  [HEADING_OPTION_VALUES.Heading6]: 6,
} as const;
const LEVEL_TO_HEADING_OPTION_VALUE = {
  1: HEADING_OPTION_VALUES.Heading1,
  2: HEADING_OPTION_VALUES.Heading2,
  3: HEADING_OPTION_VALUES.Heading3,
  4: HEADING_OPTION_VALUES.Heading4,
  5: HEADING_OPTION_VALUES.Heading5,
  6: HEADING_OPTION_VALUES.Heading6,
} as const;

// eslint-disable-next-line complexity
export default function MenuSelectHeading({
  labels,
  ...menuSelectProps
}: MenuSelectHeadingProps) {
  const { classes, cx } = useStyles();
  const editor = useRichTextEditorContext();

  const handleHeadingType: (
    event: SelectChangeEvent<"" | HeadingOptionValue>
  ) => void = useCallback(
    (event) => {
      const { value } = event.target;
      if (value === HEADING_OPTION_VALUES.Paragraph) {
        editor?.chain().setParagraph().focus().run();
      } else if (value in HEADING_OPTION_VALUE_TO_LEVEL) {
        editor
          ?.chain()
          .setHeading({
            level:
              HEADING_OPTION_VALUE_TO_LEVEL[
                value as keyof typeof HEADING_OPTION_VALUE_TO_LEVEL
              ],
          })
          .focus()
          .run();
      }
    },
    [editor]
  );

  let selectedValue: HeadingOptionValue | "" = "";
  if (editor?.isActive("paragraph")) {
    selectedValue = HEADING_OPTION_VALUES.Paragraph;
  } else if (editor?.isActive("heading")) {
    const currentNodeHeadingAttributes = getAttributesForEachSelected(
      editor.state,
      "heading"
    );
    const currentNodeLevels = currentNodeHeadingAttributes.map(
      (attrs) => attrs.level as number | undefined
    );
    const numCurrentNodeLevels = new Set(currentNodeLevels).size;
    const level = numCurrentNodeLevels === 1 ? currentNodeLevels[0] : undefined;
    if (level && level in LEVEL_TO_HEADING_OPTION_VALUE) {
      selectedValue =
        LEVEL_TO_HEADING_OPTION_VALUE[
          level as keyof typeof LEVEL_TO_HEADING_OPTION_VALUE
        ];
    }
  }

  const isCurrentlyParagraphOrHeading = selectedValue !== "";
  const canSetParagraph = editor?.can().setParagraph();
  const canSetHeading = editor?.can().setHeading({ level: 1 });

  const enabledHeadingLevels: Set<Level> = useMemo(() => {
    const headingExtension = editor?.extensionManager.extensions.find(
      (extension): extension is typeof Heading => extension.name === "heading"
    );
    return new Set(headingExtension?.options.levels ?? []);
  }, [editor]);

  return (
    <MenuSelect<HeadingOptionValue | "">
      onChange={handleHeadingType}
      disabled={
        !editor?.isEditable ||
        (!isCurrentlyParagraphOrHeading && !canSetParagraph && !canSetHeading)
      }
      displayEmpty
      renderValue={(selected) => {
        let result: ReactNode | undefined;
        if (selected === "") {
          result = labels?.emptyValue ?? labels?.empty ?? <em>Change to…</em>;
        } else if (selected === HEADING_OPTION_VALUES.Paragraph) {
          result = labels?.paragraph;
        } else if (selected === HEADING_OPTION_VALUES.Heading1) {
          result = labels?.heading1;
        } else if (selected === HEADING_OPTION_VALUES.Heading2) {
          result = labels?.heading2;
        } else if (selected === HEADING_OPTION_VALUES.Heading3) {
          result = labels?.heading3;
        } else if (selected === HEADING_OPTION_VALUES.Heading4) {
          result = labels?.heading4;
        } else if (selected === HEADING_OPTION_VALUES.Heading5) {
          result = labels?.heading5;
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (selected === HEADING_OPTION_VALUES.Heading6) {
          result = labels?.heading6;
        }
        return result ?? selected;
      }}
      aria-label="Text headings"
      tooltipTitle="Styles"
      {...menuSelectProps}
      value={selectedValue}
      inputProps={{
        ...menuSelectProps.inputProps,
        className: cx(
          classes.selectInput,
          menuSelectProps.inputProps?.className
        ),
      }}
    >
      <MenuItem
        value={HEADING_OPTION_VALUES.Paragraph}
        disabled={!isCurrentlyParagraphOrHeading && !canSetParagraph}
      >
        <MenuButtonTooltip
          label=""
          shortcutKeys={["mod", "alt", "0"]}
          placement="right"
          contentWrapperClassName={classes.menuOption}
        >
          {labels?.paragraph ?? HEADING_OPTION_VALUES.Paragraph}
        </MenuButtonTooltip>
      </MenuItem>

      {enabledHeadingLevels.has(1) && (
        <MenuItem
          value={HEADING_OPTION_VALUES.Heading1}
          disabled={!canSetHeading}
        >
          <MenuButtonTooltip
            label=""
            shortcutKeys={["mod", "alt", "1"]}
            placement="right"
            contentWrapperClassName={cx(
              classes.menuOption,
              classes.headingOption,
              classes.headingOption1
            )}
          >
            {labels?.heading1 ?? HEADING_OPTION_VALUES.Heading1}
          </MenuButtonTooltip>
        </MenuItem>
      )}

      {enabledHeadingLevels.has(2) && (
        <MenuItem
          value={HEADING_OPTION_VALUES.Heading2}
          disabled={!canSetHeading}
        >
          <MenuButtonTooltip
            label=""
            shortcutKeys={["mod", "alt", "2"]}
            placement="right"
            contentWrapperClassName={cx(
              classes.menuOption,
              classes.headingOption,
              classes.headingOption2
            )}
          >
            {labels?.heading2 ?? HEADING_OPTION_VALUES.Heading2}
          </MenuButtonTooltip>
        </MenuItem>
      )}

      {enabledHeadingLevels.has(3) && (
        <MenuItem
          value={HEADING_OPTION_VALUES.Heading3}
          disabled={!canSetHeading}
        >
          <MenuButtonTooltip
            label=""
            shortcutKeys={["mod", "alt", "3"]}
            placement="right"
            contentWrapperClassName={cx(
              classes.menuOption,
              classes.headingOption,
              classes.headingOption3
            )}
          >
            {labels?.heading3 ?? HEADING_OPTION_VALUES.Heading3}
          </MenuButtonTooltip>
        </MenuItem>
      )}

      {enabledHeadingLevels.has(4) && (
        <MenuItem
          value={HEADING_OPTION_VALUES.Heading4}
          disabled={!canSetHeading}
        >
          <MenuButtonTooltip
            label=""
            shortcutKeys={["mod", "alt", "4"]}
            placement="right"
            contentWrapperClassName={cx(
              classes.menuOption,
              classes.headingOption,
              classes.headingOption4
            )}
          >
            {labels?.heading4 ?? HEADING_OPTION_VALUES.Heading4}
          </MenuButtonTooltip>
        </MenuItem>
      )}

      {enabledHeadingLevels.has(5) && (
        <MenuItem
          value={HEADING_OPTION_VALUES.Heading5}
          disabled={!canSetHeading}
        >
          <MenuButtonTooltip
            label=""
            shortcutKeys={["mod", "alt", "5"]}
            placement="right"
            contentWrapperClassName={cx(
              classes.menuOption,
              classes.headingOption,
              classes.headingOption5
            )}
          >
            {labels?.heading5 ?? HEADING_OPTION_VALUES.Heading5}
          </MenuButtonTooltip>
        </MenuItem>
      )}

      {enabledHeadingLevels.has(6) && (
        <MenuItem
          value={HEADING_OPTION_VALUES.Heading6}
          disabled={!canSetHeading}
        >
          <MenuButtonTooltip
            label=""
            shortcutKeys={["mod", "alt", "6"]}
            placement="right"
            contentWrapperClassName={cx(
              classes.menuOption,
              classes.headingOption,
              classes.headingOption6
            )}
          >
            {labels?.heading6 ?? HEADING_OPTION_VALUES.Heading6}
          </MenuButtonTooltip>
        </MenuItem>
      )}
    </MenuSelect>
  );
}
