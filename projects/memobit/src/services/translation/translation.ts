import React from "react";

import { LanguageCode, TranslationDetails, TranslationMode } from "./types";

// @Todo: these should be passed as parameters to the function - register languages
import en from "./translations/en.json";
import ro from "./translations/ro.json";

const translations: Record<string, Record<string, string>> = {
  en: en as Record<string, string>,
  ro: ro as Record<string, string>,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let currentLanguage = "en";

// @Todo: don't forget to add this function to documentation
export const setCurrentLanguage = (language: string): void => {
  currentLanguage = language;
};

export const getCurrentLanguage = (): string => {
  return currentLanguage;
};

export const getTranslation = (text: string): TranslationDetails => {
  const languageCode = getCurrentLanguage();

  if (translations[languageCode][text]) {
    return {
      translation: translations[languageCode][text],
      mode: TranslationMode.RequestedLanguage,
    };
  }

  if (languageCode !== LanguageCode.En && translations[LanguageCode.En][text]) {
    return {
      translation: translations[LanguageCode.En][text],
      mode: TranslationMode.DefaultLanguage,
    };
  }

  return {
    translation: text,
    mode: TranslationMode.Missing,
  };
};

export const t = (text: string): string => {
  return getTranslation(text).translation;
};

export const getTranslationKey = (nodes: React.ReactNode[]): string =>
  nodes
    .map((node, index): string => {
      if (typeof node === "string") {
        return `${node as string}`;
      }

      return `{${index}}`;
    })
    .join("");

export const getRemapTranslationElements = (nodes: React.ReactNode[], translation: string): React.ReactNode => {
  const regex = new RegExp("{([0-9]+)}", "gm");
  const pseudoNodes = translation.split(regex);

  return pseudoNodes.map((pseudoNode, index): React.ReactNode => (typeof nodes[index] === "string" ? pseudoNode : nodes[index]));
};
