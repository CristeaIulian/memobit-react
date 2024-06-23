import React from "react";

import { extractChars, getHexCodeByTextHash } from "./utils";

import "./name-avatar.scss";

interface AvatarProps {
  name: string;
  size?: "small" | "large";
  numberOfInitialsToDisplay?: 1 | 2;
  hasVariousBgColors?: boolean;
}

const colorsNum = 10;

export function NameAvatar({ name, size, numberOfInitialsToDisplay = 1, hasVariousBgColors }: AvatarProps): React.ReactNode {
  const cssClasses = `main ${size === "large" ? "sizeLarge" : ""} ${hasVariousBgColors ? `bgColor${getHexCodeByTextHash(name, colorsNum)}` : ""}`;

  return <div className={cssClasses}>{extractChars(name, numberOfInitialsToDisplay)}</div>;
}
