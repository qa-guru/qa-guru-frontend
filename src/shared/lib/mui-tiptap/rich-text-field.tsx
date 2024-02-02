import { makeStyles } from "tss-react/mui";

import FieldContainer from "./field-container";
import MenuBar, { type MenuBarProps } from "./controls/menu-bar";
import RichTextContent, {
  type RichTextContentProps,
} from "./rich-text-content";
import { useRichTextEditorContext } from "./context";
import useDebouncedFocus from "./hooks/use-debounced-focus";
import { getUtilityClasses } from "./styles";
import DebounceRender from "./utils/debounce-render";

export type RichTextFieldClasses = ReturnType<typeof useStyles>["classes"];

export type RichTextFieldProps = {
  variant?: "outlined" | "standard";
  className?: string;

  disabled?: boolean;

  footer?: React.ReactNode;

  controls?: React.ReactNode;

  disableDebounceRenderControls?: boolean;
  classes?: Partial<RichTextFieldClasses>;

  MenuBarProps?: Partial<MenuBarProps>;

  RichTextContentProps?: Partial<RichTextContentProps>;
};

const richTextFieldClasses: RichTextFieldClasses = getUtilityClasses(
  "RichTextField",
  ["root", "standard", "outlined", "menuBar", "menuBarContent", "content"]
);

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const useStyles = makeStyles<void, "menuBar" | "menuBarContent" | "content">({
  name: { RichTextField },
  uniqId: "E2Alw3",
})((theme, _params, classes) => {
  return {
    root: {},

    standard: {
      [`& .${classes.content}`]: {
        padding: theme.spacing(1.5, 0),
      },

      [`& .${classes.menuBarContent}`]: {
        padding: theme.spacing(1, 0),
      },
    },

    outlined: {
      [`& .${classes.content}`]: {
        padding: theme.spacing(1.5),
      },

      [`& .${classes.menuBarContent}`]: {
        padding: theme.spacing(1, 1.5),
      },
    },

    menuBar: {},
    menuBarContent: {},
    content: { height: "130px" },
  };
});

export default function RichTextField({
  variant = "outlined",
  controls,
  disableDebounceRenderControls = false,
  disabled,
  className,
  classes: overrideClasses = {},
  footer,
  MenuBarProps,
  RichTextContentProps,
}: RichTextFieldProps) {
  const { classes, cx } = useStyles(undefined, {
    props: { classes: overrideClasses },
  });
  const editor = useRichTextEditorContext();

  const isFieldFocused = useDebouncedFocus({ editor });

  return (
    <FieldContainer
      variant={variant}
      focused={!disabled && isFieldFocused}
      disabled={disabled}
      className={cx(
        richTextFieldClasses.root,
        classes.root,
        variant === "outlined"
          ? [richTextFieldClasses.outlined, classes.outlined]
          : [richTextFieldClasses.standard, classes.standard],
        className
      )}
    >
      {controls && (
        <MenuBar
          {...MenuBarProps}
          classes={{
            ...MenuBarProps?.classes,
            root: cx(
              richTextFieldClasses.menuBar,
              classes.menuBar,
              MenuBarProps?.classes?.root
            ),
            content: cx(
              richTextFieldClasses.content,
              classes.menuBarContent,
              MenuBarProps?.classes?.content
            ),
          }}
        >
          {disableDebounceRenderControls ? (
            controls
          ) : (
            <DebounceRender>{controls}</DebounceRender>
          )}
        </MenuBar>
      )}

      <RichTextContent
        {...RichTextContentProps}
        className={cx(
          richTextFieldClasses.content,
          classes.content,
          RichTextContentProps?.className
        )}
      />

      {footer}
    </FieldContainer>
  );
}
