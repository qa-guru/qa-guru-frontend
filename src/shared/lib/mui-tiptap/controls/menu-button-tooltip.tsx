import { Tooltip, Typography, alpha, type TooltipProps } from "@mui/material";
import { makeStyles } from "tss-react/mui";

import { getModShortcutKey } from "../utils/platform";

export type MenuButtonTooltipProps = {
  label: string;
  shortcutKeys?: string[];
  placement?: TooltipProps["placement"];
  contentWrapperClassName?: string;
  children: React.ReactNode;
} & Pick<TooltipProps, "open" | "onOpen" | "onClose">;

const useStyles = makeStyles({ name: { MenuButtonTooltip } })((theme) => ({
  titleContainer: {
    textAlign: "center",
  },

  label: {
    fontSize: theme.typography.pxToRem(13),
  },

  shortcutKey: {
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.3),
    height: "19px",
    lineHeight: "19px",
    padding: "0 4px",
    minWidth: 17,
    borderRadius: theme.shape.borderRadius,
    display: "inline-block",

    "&:not(:first-of-type)": {
      marginLeft: 1,
    },
  },
}));

export default function MenuButtonTooltip({
  label,
  shortcutKeys,
  placement = "top",
  contentWrapperClassName,
  children,
  ...otherTooltipProps
}: MenuButtonTooltipProps) {
  const { classes } = useStyles();
  return (
    <Tooltip
      title={
        label || (shortcutKeys && shortcutKeys.length > 0) ? (
          <div className={classes.titleContainer}>
            <div className={classes.label}>{label}</div>

            {shortcutKeys && shortcutKeys.length > 0 && (
              <Typography variant="body2" component="div">
                {shortcutKeys.map((shortcutKey, index) => (
                  <span className={classes.shortcutKey} key={index}>
                    {shortcutKey === "mod" ? getModShortcutKey() : shortcutKey}
                  </span>
                ))}
              </Typography>
            )}
          </div>
        ) : (
          ""
        )
      }
      placement={placement}
      arrow
      {...otherTooltipProps}
    >
      <span className={contentWrapperClassName}>{children}</span>
    </Tooltip>
  );
}
