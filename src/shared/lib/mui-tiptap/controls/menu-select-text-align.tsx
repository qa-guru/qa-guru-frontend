import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { MenuItem, type SelectChangeEvent } from "@mui/material";
import { useCallback, useMemo } from "react";
import { makeStyles } from "tss-react/mui";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
import type { Except } from "type-fest";

import { useRichTextEditorContext } from "../context";
import MenuButtonTooltip, {
  type MenuButtonTooltipProps,
} from "./menu-button-tooltip";
import { MENU_BUTTON_FONT_SIZE_DEFAULT } from "./menu-button";
import MenuSelect, { type MenuSelectProps } from "./menu-select";

export type TextAlignSelectOption = {
  value: string;
  IconComponent: React.ElementType<{
    className: string;
  }>;
  label?: string;
  shortcutKeys?: MenuButtonTooltipProps["shortcutKeys"];
};

export interface MenuSelectTextAlignProps
  extends Except<MenuSelectProps<string>, "children"> {
  options?: TextAlignSelectOption[];
  alignmentOptions?: {
    alignment: string;
    IconComponent: React.ElementType<{
      className: string;
    }>;
    label?: string;
    shortcutKeys?: MenuButtonTooltipProps["shortcutKeys"];
  }[];
  emptyLabel?: React.ReactNode;
}

const useStyles = makeStyles({ name: { MenuSelectTextAlign } })((theme) => ({
  selectInput: {
    width: MENU_BUTTON_FONT_SIZE_DEFAULT,
  },

  menuItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  menuOption: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },

  menuButtonIcon: {
    fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
    color: theme.palette.action.active,
  },
}));

const DEFAULT_ALIGNMENT_OPTIONS: TextAlignSelectOption[] = [
  {
    value: "left",
    label: "Left",
    shortcutKeys: ["mod", "Shift", "L"],
    IconComponent: FormatAlignLeftIcon,
  },
  {
    value: "center",
    label: "Center",
    shortcutKeys: ["mod", "Shift", "E"],
    IconComponent: FormatAlignCenterIcon,
  },
  {
    value: "right",
    label: "Right",
    shortcutKeys: ["mod", "Shift", "R"],
    IconComponent: FormatAlignRightIcon,
  },
  {
    value: "justify",
    label: "Justify",
    shortcutKeys: ["mod", "Shift", "J"],
    IconComponent: FormatAlignJustifyIcon,
  },
];

export default function MenuSelectTextAlign({
  options = DEFAULT_ALIGNMENT_OPTIONS,
  emptyLabel = "",
  alignmentOptions,
  ...menuSelectProps
}: MenuSelectTextAlignProps) {
  const { classes, cx } = useStyles();
  const editor = useRichTextEditorContext();

  options =
    alignmentOptions?.map((option) => ({
      ...option,
      value: option.alignment,
    })) ?? options;

  const handleAlignmentSelect: (event: SelectChangeEvent) => void = useCallback(
    (event) => {
      const alignment = event.target.value;
      editor?.chain().setTextAlign(alignment).focus().run();
    },
    [editor]
  );

  const textAlignExtensionOptions = useMemo(() => {
    const textAlignExtension = editor?.extensionManager.extensions.find(
      (extension) => extension.name === "textAlign"
    );
    return textAlignExtension?.options as TextAlignOptions | undefined;
  }, [editor]);

  const enabledAlignments: Set<TextAlignOptions["alignments"][0]> =
    useMemo(() => {
      return new Set(textAlignExtensionOptions?.alignments);
    }, [textAlignExtensionOptions]);

  const selectedValue =
    Array.from(enabledAlignments).find((alignment) =>
      editor?.isActive({ textAlign: alignment })
    ) ?? "";

  return (
    <MenuSelect<string>
      onChange={handleAlignmentSelect}
      disabled={
        !editor?.isEditable ||
        !Array.from(enabledAlignments).some((alignment) =>
          editor.can().setTextAlign(alignment)
        )
      }
      renderValue={(value) => {
        let content;
        if (value) {
          const alignmentOptionForValue = options.find(
            (option) => option.value === value
          );
          content = alignmentOptionForValue ? (
            <alignmentOptionForValue.IconComponent
              className={classes.menuButtonIcon}
            />
          ) : (
            value
          );
        } else {
          content = emptyLabel;
        }
        return <span className={classes.menuOption}>{content}</span>;
      }}
      aria-label="Text alignments"
      tooltipTitle="Align"
      value={selectedValue}
      displayEmpty
      {...menuSelectProps}
      inputProps={{
        ...menuSelectProps.inputProps,
        className: cx(
          classes.selectInput,
          menuSelectProps.inputProps?.className
        ),
      }}
    >
      {options
        .filter((alignmentOption) =>
          enabledAlignments.has(alignmentOption.value)
        )
        .map((alignmentOption) => (
          <MenuItem
            key={alignmentOption.value}
            value={alignmentOption.value}
            disabled={!editor?.can().setTextAlign(alignmentOption.value)}
            className={classes.menuItem}
          >
            <MenuButtonTooltip
              label={alignmentOption.label ?? ""}
              shortcutKeys={alignmentOption.shortcutKeys}
              placement="right"
              contentWrapperClassName={classes.menuOption}
            >
              <alignmentOption.IconComponent
                className={classes.menuButtonIcon}
              />
            </MenuButtonTooltip>
          </MenuItem>
        ))}
    </MenuSelect>
  );
}
