import type { Icon } from "@primer/octicons-react";

export type LabeledMenuItem = {
  Icon: Icon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
};
