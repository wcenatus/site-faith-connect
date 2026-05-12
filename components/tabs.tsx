"use client";

import { useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

export type TabsProps = {
  tabs: TabItem[];
  /** Uncontrolled: initial active tab id. Defaults to the first tab. */
  defaultActiveId?: string;
  /** Controlled: currently active tab id. */
  activeId?: string;
  /** Fires whenever the active tab changes. */
  onChange?: (id: string) => void;
  /** Wrapper class for layout/spacing. */
  className?: string;
  /** Class applied to the tab list row. */
  tabListClassName?: string;
  /** Class applied to the active panel wrapper. */
  panelClassName?: string;
};

export function Tabs({
  tabs,
  defaultActiveId,
  activeId,
  onChange,
  className = "",
  tabListClassName = "",
  panelClassName = "",
}: TabsProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | undefined>(
    defaultActiveId ?? tabs[0]?.id,
  );

  const isControlled = activeId !== undefined;
  const currentId = isControlled ? activeId : internalActiveId;

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalActiveId(id);
    onChange?.(id);
  };

  const activeTab = tabs.find((t) => t.id === currentId);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={[
          "flex items-end gap-6 border-b border-[#e6d4ad] sm:gap-9",
          tabListClassName,
        ].join(" ")}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === currentId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(tab.id)}
              className={[
                "relative -mb-px py-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7e9b5e]/40 focus-visible:rounded-sm",
                isActive
                  ? "text-[#2c4a32]"
                  : "text-slate-500 hover:text-[#2c4a32]",
              ].join(" ")}
            >
              {tab.label}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-t-full bg-[#7e9b5e]"
                />
              )}
            </button>
          );
        })}
      </div>

      {activeTab?.content !== undefined && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className={["pt-6", panelClassName].join(" ")}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
