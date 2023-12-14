import {
  Select,
  outlinedInputClasses,
  selectClasses,
  svgIconClasses,
  type SelectProps,
} from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";

import MenuButtonTooltip from "./menu-button-tooltip";

export type MenuSelectProps<T> = SelectProps<T> & {
  tooltipTitle?: string;
};

const useStyles = makeStyles({ name: { MenuSelect } })((theme) => {
  return {
    rootTooltipWrapper: {
      display: "inline-flex",
    },

    selectRoot: {
      [`&:not(:hover):not(.${outlinedInputClasses.focused}) .${outlinedInputClasses.notchedOutline}`]:
        {
          borderWidth: 0,
        },

      [`& .${svgIconClasses.root}`]: {
        color: theme.palette.action.active,
      },

      [`&.${selectClasses.disabled} .${svgIconClasses.root}`]: {
        color: theme.palette.action.disabled,
      },
    },

    select: {
      "&&&": {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
      },
    },

    selectDropdownIcon: {
      right: 1,
    },

    input: {
      paddingTop: "3px",
      paddingBottom: "3px",
      fontSize: "0.9em",
    },
  };
});

export default function MenuSelect<T>({
  tooltipTitle,
  ...selectProps
}: MenuSelectProps<T>) {
  const { classes, cx } = useStyles();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const select = (
    <Select<T>
      margin="none"
      variant="outlined"
      size="small"
      {...selectProps}
      onMouseEnter={(...args) => {
        setTooltipOpen(true);
        selectProps.onMouseEnter?.(...args);
      }}
      onMouseLeave={(...args) => {
        setTooltipOpen(false);
        selectProps.onMouseLeave?.(...args);
      }}
      onClick={(...args) => {
        setTooltipOpen(false);
        selectProps.onClick?.(...args);
      }}
      inputProps={{
        ...selectProps.inputProps,
        className: cx(classes.input, selectProps.inputProps?.className),
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        ...selectProps.MenuProps,
      }}
      className={cx(classes.selectRoot, selectProps.className)}
      classes={{
        ...selectProps.classes,
        select: cx(classes.select, selectProps.classes?.select),
        icon: cx(classes.selectDropdownIcon, selectProps.classes?.icon),
      }}
    />
  );
  return tooltipTitle ? (
    <MenuButtonTooltip
      label={tooltipTitle}
      contentWrapperClassName={classes.rootTooltipWrapper}
      open={tooltipOpen}
    >
      {select}
    </MenuButtonTooltip>
  ) : (
    select
  );
}
