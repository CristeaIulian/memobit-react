// import { useCallback, useEffect } from "react";

export const getTheme = () => {
    const lsTheme = localStorage.getItem("mem-theme");
    return lsTheme ? JSON.parse(lsTheme) : "dark-linear";
};

export const setTheme = (assetsPath?: string): void => {
    const theme = getTheme();

    const themeLink = document.createElement("link");
    themeLink.rel = "stylesheet";
    themeLink.type = "text/css";
    themeLink.href = `${assetsPath ? assetsPath : ""}/memobit/themes/${theme}.css`;

    const head = document.getElementsByTagName("head");
    head[0].appendChild(themeLink);
};

// export const ThemeService = (assetsPath = ''): void => {
//   const getTheme = () => {
//     const lsTheme = localStorage.getItem("mem-theme");
//     return lsTheme ? JSON.parse(lsTheme) : "dark-linear";
//   };
//
//   const setTheme = (assetsPath?: string): void => {
//       const theme = getTheme();
//
//       const themeLink = document.createElement("link");
//       themeLink.rel = "stylesheet";
//       themeLink.type = "text/css";
//       themeLink.href = `${assetsPath ? assetsPath : ""}/memobit/themes/${theme}.css`;
//
//       const head = document.getElementsByTagName("head");
//       head[0].appendChild(themeLink);
//   };
//
//   useEffect(() => {
//     setTheme(assetsPath);
//   }, [assetsPath, setTheme]);
// };




