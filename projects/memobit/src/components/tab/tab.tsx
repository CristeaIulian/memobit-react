import React, { useEffect, useState } from "react";

import { TabItem } from "./types";

interface TabProps {
  items: TabItem[];
  activeTab: string;
  selectedTab: (tab: string) => void;
}

export const Tab = ({ items = [], activeTab = "", selectedTab }: TabProps): React.ReactNode => {
  const [active, setActive] = useState(activeTab);

  useEffect(() => {
    if (items.length > 0 && !activeTab) {
      setActive(items[0].key);
    } else {
      setActive(activeTab);
    }
  }, [items, activeTab]);

  const onTabChange = (tab: string): void => {
    setActive(tab);
    selectedTab(tab);
  };

  return (
    <>
      {items.map((tab) => (
        <button key={tab.key} className={`tab ${active === tab.key ? "active" : ""}`} onClick={() => onTabChange(tab.key)}>
          {tab.label}
        </button>
      ))}
    </>
  );
};
