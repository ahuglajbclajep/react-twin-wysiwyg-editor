import { clsx } from "clsx/lite";

import type { LabeledMenuItem } from "./types";

type Props = {
  menuItems: LabeledMenuItem[];
  className?: string;
};

export const LabeledMenuList = ({ menuItems, className }: Props) => (
  <div
    className={clsx(
      "flex flex-col rounded-lg border border-border bg-bg py-2",
      className,
    )}
  >
    {menuItems.map(
      ({ Icon, label, onClick, disabled = false, isActive = false }) => (
        <button
          key={label}
          className={clsx(
            "flex items-center gap-x-2 px-4 py-2",
            "enabled:hover:bg-bg-light disabled:text-text-muted",
            isActive && "bg-bg-light",
          )}
          onClick={onClick}
          disabled={disabled}
        >
          <Icon size={24} className="text-icon" />
          <span>{label}</span>
        </button>
      ),
    )}
  </div>
);
