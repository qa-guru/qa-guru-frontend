import {
  alpha,
  darken,
  lighten,
  type CSSObject,
  type Theme,
} from "@mui/material";
import omit from "lodash/omit";
import { keyframes } from "tss-react";

type StyleRules = Record<string, CSSObject>;

export const Z_INDEXES = {
  TABLE_ELEMENT: 1,
  MENU_BAR: 2,
  NOTCHED_OUTLINE: 2,
  BUBBLE_MENU: 3000,
} as const;

export function getEditorStyles(theme: Theme): StyleRules {
  const hasResponsiveStyles = Object.keys(theme.typography.h1).some((key) =>
    key.includes("@media")
  );

  const cursorDelayOpacityChangeAnimation = keyframes`
      0%, 95% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    `;

  return {
    ...omit(theme.typography.body1, ["lineHeight"]),

    "&:focus": {
      outline: "none",
    },

    "& h1": {
      fontFamily: theme.typography.h3.fontFamily,
      fontWeight: "bold",

      ...(hasResponsiveStyles
        ? {
            fontSize: `${1.5625 * 1.2}rem`,

            [theme.breakpoints.up("sm")]: {
              fontSize: `${1.8219 * 1.2}rem`,
            },

            [theme.breakpoints.up("md")]: {
              fontSize: `${2.0243 * 1.2}rem`,
            },

            [theme.breakpoints.up("lg")]: {
              fontSize: `${2.0243 * 1.2}rem`,
            },
          }
        : {
            fontSize: `${2.0243 * 1.2}rem`,
          }),
    },

    "& h2": {
      ...omit(theme.typography.h4, ["lineHeight"]),
      fontWeight: 500,
    },

    "& h3": {
      ...omit(theme.typography.h5, ["lineHeight"]),
      fontWeight: 500,
    },

    "& h4": {
      ...omit(theme.typography.h6, ["lineHeight"]),
      fontWeight: 500,
    },

    "& h5": {
      ...omit(theme.typography.subtitle1, ["lineHeight"]),
      fontWeight: 500,
    },

    "& h6": {
      ...omit(theme.typography.subtitle2, ["lineHeight"]),
      fontWeight: 500,
    },

    "& h1, & h2, & h3, & h4, & h5, & h6, & p": {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },

    '& a:not([data-type="mention"])': {
      color: theme.palette.app.primary,
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    },

    "& ul, & ol": {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },

    "& ol": {
      listStyleType: "decimal",
      "& ol": {
        listStyleType: "lower-alpha",
        "& ol": {
          listStyleType: "lower-roman",
          "& ol": {
            listStyleType: "decimal",
            "& ol": {
              listStyleType: "lower-alpha",
              "& ol": {
                listStyleType: "lower-roman",
              },
            },
          },
        },
      },
    },

    "& ul": {
      listStyleType: "disc",
      "& ul": {
        listStyleType: "circle",
        "& ul": {
          listStyleType: "square",
          "& ul": {
            listStyleType: "disc",
            "& ul": {
              listStyleType: "circle",
              "& ul": {
                listStyleType: "square",
              },
            },
          },
        },
      },
    },

    '& ul[data-type="taskList"]': {
      listStyle: "none",
      padding: 0,

      "& li": {
        display: "flex",

        "& > label": {
          flex: "0 0 auto",
          marginRight: "0.5rem",
          userSelect: "none",
        },

        "& > div": {
          flex: "1 1 auto",
        },
      },
    },

    "& blockquote": {
      paddingLeft: "1rem",
      marginInlineStart: theme.spacing(1),
      marginInlineEnd: theme.spacing(1),
      position: "relative",

      "&:before": {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        display: "block",
        width: 4,
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.text.disabled,
        content: '""',
      },
    },

    "& :not(pre) > code": {
      padding: "2px 3px 1px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
      borderRadius: 3,
      backgroundColor: theme.palette.action.hover,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.app.secondary
          : darken(theme.palette.secondary.dark, 0.1),
    },

    "& pre": {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      padding: theme.spacing(1),
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.action.hover,
      lineHeight: 1.4,
      overflowX: "auto",
      whiteSpace: "pre !important" as "pre",
    },

    '& [data-type="mention"]': {
      padding: "0 0.25rem",
      lineHeight: "1.3em",
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.app.primary,
      background:
        theme.palette.mode === "dark"
          ? alpha(darken(theme.palette.primary.dark, 0.7), 0.5)
          : alpha(lighten(theme.palette.primary.light, 0.6), 0.3),
      textDecoration: "none",
    },

    "& img:not(.ProseMirror-separator)": {
      maxWidth: "100%",
      height: "auto",
      display: "block",
      ...getImageBackgroundColorStyles(theme),

      "&.ProseMirror-selectednode": {
        outline: `3px solid ${theme.palette.app.primary}`,
      },
    },

    "& hr": {
      borderWidth: 0,
      borderTopWidth: "thin",
      borderStyle: "solid",
      borderColor: theme.palette.text.secondary,

      "&.ProseMirror-selectednode": {
        borderColor: theme.palette.app.primary,
      },
    },

    "& table": {
      borderCollapse: "collapse",
      tableLayout: "fixed",
      margin: 0,
      overflowY: "hidden",
      overflowX: "auto",
      display: "block",

      "& td, th": {
        minWidth: "1em",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[500]
            : theme.palette.grey[400],
        padding: "3px 5px",
        verticalAlign: "top",
        boxSizing: "border-box",
        position: "relative",

        "& > *": {
          marginBottom: 0,
        },
      },

      "& th": {
        fontWeight: 500,
        textAlign: "left",
        backgroundColor: theme.palette.action.selected,
      },
    },

    "& .tableWrapper": {
      overflowX: "auto",

      "& table": {
        overflow: "hidden",
        display: "table",
      },
    },

    "& .selectedCell:after": {
      zIndex: Z_INDEXES.TABLE_ELEMENT,
      position: "absolute",
      content: '""',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: "rgba(200, 200, 255, 0.4)",
      pointerEvents: "none",
    },

    '&[contenteditable="true"]': {
      "& .column-resize-handle": {
        position: "absolute",
        right: -2,
        top: -1,
        bottom: -2,
        width: 4,
        zIndex: Z_INDEXES.TABLE_ELEMENT,
        backgroundColor: theme.palette.primary.light,
        pointerEvents: "none",
      },

      "&.resize-cursor": {
        cursor: "col-resize",
      },
    },

    '&[contenteditable="false"]': {
      "& .column-resize-handle": {
        display: "none",
      },

      "&.resize-cursor": {
        pointerEvents: "none",
      },
    },

    "& p.is-editor-empty:first-of-type::before": {
      color: theme.palette.text.disabled,
      content: "attr(data-placeholder)",
      float: "left",
      height: 0,
      pointerEvents: "none",
    },

    "& .ProseMirror-gapcursor:after": {
      borderColor: theme.palette.text.primary,
    },

    "& .collaboration-cursor__caret": {
      borderLeft: "1px solid #0d0d0d",
      borderRight: "1px solid #0d0d0d",
      marginLeft: "-1px",
      marginRight: "-1px",
      position: "relative",
      wordBreak: "normal",
      cursor: "text",

      "&:after": {
        position: "absolute",
        content: '""',
        left: -3,
        right: 0,
        top: -2,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "inherit",
      },

      "&:hover .collaboration-cursor__label": {
        opacity: 1,
        transition: theme.transitions.create("opacity", {
          delay: 0,
          duration: 100,
          easing: "linear",
        }),
      },
    },

    "& .collaboration-cursor__label": {
      borderRadius: "3px 3px 3px 0",
      color: "#0d0d0d",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: 600,
      fontFamily: theme.typography.body1.fontFamily,
      left: -1,
      lineHeight: "normal",
      padding: "0.1rem 0.3rem",
      position: "absolute",
      top: "-1.4em",
      userSelect: "none",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      opacity: 0,
      transition: theme.transitions.create("opacity", {
        delay: 500,
        duration: 100,
        easing: "linear",
      }),
      animation: `${cursorDelayOpacityChangeAnimation} 3s linear 1`,
    },
    ".iframe-container": {
      position: "relative",
      width: "100%",
      "@media (max-width: 768px)": {
        paddingTop: "56.25%",
      },
    },

    ".iframe-container iframe": {
      width: "640px",
      height: "360px",
      "@media (max-width: 768px)": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      },
    },

    ".tiptap": {
      pre: {
        background: "#263238 !important",
        borderRadius: "0.5rem",
        color: "#fff",
        fontFamily: '"JetBrainsMono", monospace',
        padding: "0.75rem 1rem",
        code: {
          background: "none",
          color: "inherit",
          fontSize: "0.8rem",
          padding: 0,
        },
        ".hljs-comment, .hljs-quote": {
          color: "#616161",
        },
        ".hljs-variable, .hljs-template-variable, .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class":
          {
            color: "#f98181",
          },
        ".hljs-number, .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal, .hljs-type, .hljs-params":
          {
            color: "#fbbc88",
          },
        ".hljs-string, .hljs-symbol, .hljs-bullet": {
          color: "#b9f18d",
        },
        ".hljs-title, .hljs-section": {
          color: "#faf594",
        },
        ".hljs-keyword, .hljs-selector-tag": {
          color: "#70cff8",
        },
        ".hljs-emphasis": {
          fontStyle: "italic",
        },
        ".hljs-strong": {
          fontWeight: "700",
        },
      },
    },
  };
}

export function getImageBackgroundColorStyles(theme: Theme): {
  backgroundColor?: string;
  color?: string;
} {
  if (theme.palette.mode !== "dark") {
    return {};
  }

  const backgroundColor = theme.palette.grey[200];
  return {
    backgroundColor,
    color: theme.palette.getContrastText(backgroundColor),
  };
}

const UTILITY_CLASS_PREFIX_DEFAULT = "MuiTiptap-";

export function getUtilityClass(componentName: string, slot: string): string {
  return `${UTILITY_CLASS_PREFIX_DEFAULT}${componentName}-${slot}`;
}

export function getUtilityClasses<T extends string>(
  componentName: string,
  slots: T[]
): Record<T, string> {
  const result: Record<string, string> = {};

  slots.forEach((slot) => {
    result[slot] = getUtilityClass(componentName, slot);
  });

  return result;
}
