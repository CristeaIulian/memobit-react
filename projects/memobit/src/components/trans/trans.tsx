import React from "react";

import { getTranslation, TranslationDetails } from "@memobit/services/translation";
import { getNodeTranslation, getStyle, parseTranslationVariables } from "./utils.ts";

interface TransProps {
  children: React.ReactNode;
  values?: Record<string, string | number | undefined>;
}

export function Trans({ children, values }: TransProps): React.ReactNode {
  let translationDetails: TranslationDetails | undefined = undefined;

  if (typeof children === "string") {
    translationDetails = getTranslation(children);

    if (typeof values === "object" && translationDetails) {
      translationDetails.translation = parseTranslationVariables(translationDetails.translation, values);
    }

    return <span style={translationDetails ? getStyle(translationDetails.mode) : undefined}>{translationDetails?.translation}</span>;
  }

  if (Array.isArray(children)) {
    const [translationDetails, remappedTranslation] = getNodeTranslation(children);
    return <span style={getStyle(translationDetails.mode)}>{remappedTranslation}</span>;
  }

  console.warn("Trans :: Unsupported children type", children);
}
