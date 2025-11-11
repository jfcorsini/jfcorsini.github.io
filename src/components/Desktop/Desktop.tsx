import React from "react";
import './Desktop.css';
import { Particles } from "./Particles";

export const Desktop = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="container">
      <Particles />
      {children}
    </div>
  )
}