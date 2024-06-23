import React from "react";

import { CountryDetails } from "./types";

import "./country.scss";

interface CountryProps {
  code: string;
  nameFirst?: boolean;
}

// @Todo: move whatever is in types to a dedicated service and apply functions if possible

export function Country({ code, nameFirst = false }: CountryProps): React.ReactNode {
  if (!CountryDetails[code]) {
    console.warn(`Unknown country code: ${code}`);
    return null;
  }

  // @Todo: see a better way to handle flag images
  const imageSrc: string = CountryDetails[code].hasFlag ? `assets/memobit/flags/${code.toString()}.png` : "";

  return (
    <div className={`container ${nameFirst ? "name-first" : ""}`}>
      {CountryDetails[code] && (
        <>
          {CountryDetails[code].hasFlag && <img src={imageSrc} alt={code.toString()} width={24} height={24} />}
          <div>{CountryDetails[code].name}</div>
        </>
      )}
    </div>
  );
}
