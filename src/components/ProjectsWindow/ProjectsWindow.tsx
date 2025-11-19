import { motion } from "motion/react";
import React, { useState } from "react";
import { Windows } from "../Window";
import { WindowUrlTitleBar } from "../Window/WindowsUrlTitleBar";
import styles from "./ProjectWindow.module.css";

const tabs = {
  dress4weather: {
    url: "https://www.dress4weather.com",
    name: "Dress4Weather",
  },
  casting: {
    url: "https://www.kivacast.com",
    name: "KivaCast",
  },
};

type Tab = keyof typeof tabs;

export const ProjectsWindow: React.FC = () => {
  const [tab, setTab] = useState<Tab>("dress4weather");

  return (
    <Windows name="projects" width="1200px" height="720px">
      <Windows.TitleBar>
        <WindowUrlTitleBar
          openUrlOnClick
          url={tabs[tab].url}
          iconName="Folder"
        />
      </Windows.TitleBar>
      <Windows.Content>
        <div className={styles.content}>
          <div className={styles.tabContainer}>
            {Object.keys(tabs).map((_t) => {
              const t = _t as Tab;
              const isSelected = tab === t;

              return (
                <motion.div
                  key={"tab-" + t}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setTab(t)}
                  className={`${styles.tab} ${isSelected ? styles.tabSelected : ""}`}
                >
                  {tabs[t].name}
                </motion.div>
              );
            })}
          </div>
          <iframe src={tabs[tab].url} />
        </div>
      </Windows.Content>
    </Windows>
  );
};
