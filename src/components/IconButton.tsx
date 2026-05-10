import clsx from "clsx/lite";
import type { Icon, IconProps } from "@primer/octicons-react";

type Props = React.ComponentPropsWithRef<"button"> & {
  icon: Icon;
  size?: IconProps["size"];
  className?: string;
};

export const IconButton = ({
  icon: Icon,
  size,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "flex cursor-pointer items-center justify-center",
        "bg-bg enabled:hover:bg-bg-light disabled:text-text-muted",
        className,
      )}
      {...props}
    >
      <Icon size={size} />
    </button>
  );
};
