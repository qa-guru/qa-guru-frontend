import { useCallback, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

type ResizableImageResizerProps = {
  className?: string;
  onResize: (event: MouseEvent) => void;
};

const useStyles = makeStyles({ name: { ResizableImageResizer } })((theme) => ({
  root: {
    position: "absolute",

    bottom: -3,
    right: -3,
    width: 12,
    height: 12,
    background: theme.palette.app.primary,
    cursor: "nwse-resize",
  },
}));

export function ResizableImageResizer({
  onResize,
  className,
}: ResizableImageResizerProps) {
  const { classes, cx } = useStyles();
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      onResize(event);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onResize]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = useCallback((_event: React.MouseEvent) => {
    setMouseDown(true);
  }, []);

  return (
    <div
      className={cx(classes.root, className)}
      onMouseDown={handleMouseDown}
    />
  );
}
