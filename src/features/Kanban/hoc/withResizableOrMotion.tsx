import React, { ComponentType } from "react";
import { motion, MotionProps } from "framer-motion";
import { Resizable } from "re-resizable";

type ResizableProps = React.ComponentProps<typeof Resizable>;

interface WithResizableOrMotionProps {
  useMotion: boolean;
  motionProps?: MotionProps;
  resizableProps?: ResizableProps;
  detailsWidth: string;
  setDetailsWidth: (value: React.SetStateAction<string>) => void;
  onAnimationComplete?: () => void;
}

const withResizableOrMotion = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P & WithResizableOrMotionProps> => {
  return ({
    useMotion,
    motionProps,
    resizableProps,
    detailsWidth,
    setDetailsWidth,
    onAnimationComplete,
    ...rest
  }) => {
    if (useMotion) {
      return (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: detailsWidth }}
          exit={{ width: 0 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={onAnimationComplete}
        >
          <WrappedComponent {...(rest as P)} />
        </motion.div>
      );
    } else {
      return (
        <Resizable
          enable={{ left: true }}
          size={{ width: detailsWidth, height: "100%" }}
          maxWidth="50%"
          minWidth="34%"
          onResize={(e, direction, ref, d) => {
            setDetailsWidth((prevWidth) => {
              const newWidth = parseInt(prevWidth, 10) - d.width;
              return `${newWidth}px`;
            });
          }}
        >
          <WrappedComponent {...(rest as P)} />
        </Resizable>
      );
    }
  };
};

export default withResizableOrMotion;
