import { makeStyles } from "tss-react/mui";
import type { Except } from "type-fest";

import DebounceRender, {
  type DebounceRenderProps,
} from "../utils/debounce-render";

export type MenuControlsContainerProps = {
  children?: React.ReactNode;
  className?: string;
  debounced?: boolean;
  DebounceProps?: Except<DebounceRenderProps, "children">;
};

const useStyles = makeStyles({
  name: { MenuControlsContainer },
})((theme) => {
  return {
    root: {
      display: "flex",
      rowGap: theme.spacing(0.3),
      columnGap: theme.spacing(0.3),
      alignItems: "center",
      flexWrap: "wrap",
    },
  };
});

export default function MenuControlsContainer({
  children,
  className,
  debounced,
  DebounceProps,
}: MenuControlsContainerProps) {
  const { classes, cx } = useStyles();
  const content = <div className={cx(classes.root, className)}>{children}</div>;
  return debounced ? (
    <DebounceRender {...DebounceProps}>{content}</DebounceRender>
  ) : (
    content
  );
}
