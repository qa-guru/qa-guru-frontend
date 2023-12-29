import type React from "react";
import { makeStyles } from "tss-react/mui";

import { Z_INDEXES, getUtilityClasses } from "./styles";

export type FieldContainerClasses = ReturnType<typeof useStyles>["classes"];

export type FieldContainerProps = {
  variant?: "outlined" | "standard";
  children: React.ReactNode;
  className?: string;
  classes?: Partial<FieldContainerClasses>;
  focused?: boolean;
  disabled?: boolean;
};

const fieldContainerClasses: FieldContainerClasses = getUtilityClasses(
  "FieldContainer",
  ["root", "outlined", "standard", "focused", "disabled", "notchedOutline"]
);

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const useStyles = makeStyles<void, "focused" | "disabled" | "notchedOutline">({
  name: { FieldContainer },
  uniqId: "Os7ZPW",
})((theme, _params, classes) => {
  return {
    root: {},

    outlined: {
      borderRadius: theme.shape.borderRadius,
      padding: 1, //
      position: "relative",

      [`&:hover .${classes.notchedOutline}`]: {
        borderColor: theme.palette.text.primary,
      },

      [`&.${classes.focused} .${classes.notchedOutline}`]: {
        borderColor: theme.palette.app.primary,
        borderWidth: 2,
      },

      [`&.${classes.disabled} .${classes.notchedOutline}`]: {
        borderColor: theme.palette.action.disabled,
      },
    },

    standard: {},

    focused: {},

    disabled: {},

    notchedOutline: {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      borderColor:
        theme.palette.mode === "light"
          ? "rgba(0, 0, 0, 0.23)"
          : "rgba(255, 255, 255, 0.23)",
      borderStyle: "solid",
      borderWidth: 1,
      pointerEvents: "none",
      overflow: "hidden",
      zIndex: Z_INDEXES.NOTCHED_OUTLINE,
    },
  };
});

export default function FieldContainer({
  variant = "outlined",
  children,
  focused,
  disabled,
  classes: overrideClasses = {},
  className,
}: FieldContainerProps) {
  const { classes, cx } = useStyles(undefined, {
    props: { classes: overrideClasses },
  });

  return (
    <div
      className={cx(
        fieldContainerClasses.root,
        classes.root,
        variant === "outlined"
          ? [fieldContainerClasses.outlined, classes.outlined]
          : [fieldContainerClasses.standard, classes.standard],

        focused && [fieldContainerClasses.focused, classes.focused],
        disabled && [fieldContainerClasses.disabled, classes.disabled],
        className
      )}
    >
      {children}

      {variant === "outlined" && (
        <div
          className={cx(
            fieldContainerClasses.notchedOutline,
            classes.notchedOutline
          )}
          aria-hidden
        />
      )}
    </div>
  );
}
