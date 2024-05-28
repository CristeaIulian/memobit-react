import React, { useEffect, useState } from "react";

import "./delimiter.scss";

interface DelimiterProps {
  hasVerticalMargins?: boolean;
  hasTopMargin?: boolean;
  hasBottomMargin?: boolean;
  hasCanceledHorizontalMargins?: boolean;
}

export const Delimiter = ({
  hasVerticalMargins = false,
  hasTopMargin = false,
  hasBottomMargin = false,
  hasCanceledHorizontalMargins = false,
}: DelimiterProps): React.ReactNode => {
  const [cssClasses, setCssClasses] = useState<string[]>([]);

  useEffect(() => {
    const newCssClasses = ["delimiter"];

    if (hasVerticalMargins) {
      newCssClasses.push("delimiter-with-vertical-margins");
    }

    if (hasTopMargin) {
      newCssClasses.push("delimiter-top-margin");
    }

    if (hasBottomMargin) {
      newCssClasses.push("delimiter-bottom-margin");
    }

    if (hasCanceledHorizontalMargins) {
      newCssClasses.push("delimiter-cancel-horizontal-margins");
    }

    setCssClasses(newCssClasses);
  }, [
    hasVerticalMargins,
    hasTopMargin,
    hasBottomMargin,
    hasCanceledHorizontalMargins,
  ]);

  return <div className={cssClasses.join(" ")}></div>;
};
