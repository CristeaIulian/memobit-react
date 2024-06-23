import { getRemapTranslationElements, getTranslation, getTranslationKey, TranslationDetails, TranslationMode } from "@memobit/services/translation";
import React from "react";

export const getStyle = (translationMode: TranslationMode): React.CSSProperties =>
  translationMode === TranslationMode.Missing ? { backgroundColor: "#f77f17", color: "#ffffff", padding: "4px", borderRadius: "4px" } : {};

export const getNodeTranslation = (nodes: React.ReactNode[]): [TranslationDetails, React.ReactNode] => {
  const translationKey = getTranslationKey(nodes);
  const translationDetails = getTranslation(translationKey);

  return [translationDetails, getRemapTranslationElements(nodes, translationDetails.translation)];
};

export const parseTranslationVariables = (translation: string, values: Record<string, string | number | undefined>): string => {
  let translationResult = translation;

  Object.entries(values).forEach(([key, value]): void => {
    translationResult = translationResult.replace(`[[${key}]]`, value as string);
  });

  return translationResult;
};
