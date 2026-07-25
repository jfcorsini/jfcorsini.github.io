import { motion } from "motion/react";
import React, { useState } from "react";
import { PROJECTS, type Project } from "../../lib/projects";
import { Windows } from "../Window";
import { WindowUrlTitleBar } from "../Window/WindowsUrlTitleBar";
import styles from "./ProjectWindow.module.css";

export const ProjectsWindow: React.FC = () => {
  const [tab, setTab] = useState<Project>(PROJECTS[0]);

  return (
    <Windows name="projects" width="1200px" height="720px">
      <Windows.TitleBar>
        <WindowUrlTitleBar openUrlOnClick url={tab.url} iconName="Folder" />
      </Windows.TitleBar>
      <Windows.Content>
        <div className={styles.content}>
          <div className={styles.tabContainer}>
            {PROJECTS.map((project) => {
              const isSelected = tab.id === project.id;

              return (
                <motion.div
                  key={"tab-" + project.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setTab(project)}
                  className={`${styles.tab} ${isSelected ? styles.tabSelected : ""}`}
                >
                  {project.name}
                </motion.div>
              );
            })}
          </div>
          <iframe src={tab.url} />
        </div>
      </Windows.Content>
    </Windows>
  );
};
