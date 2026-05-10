import type { Icon } from "@primer/octicons-react";

type MenuItemBase = {
  Icon: Icon;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
};

export type LabeledMenuItem = MenuItemBase & {
  label: string;
};

export type IconOnlyMenuItem = MenuItemBase & {
  key: string;
};
