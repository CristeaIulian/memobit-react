import React, { useEffect } from "react";

import { Playground } from "../playground/playground.tsx";

import "./app.scss";

const AppComponent = (): React.ReactNode => {
  useEffect(() => {
    // this._themeService.setTheme('assets'); service not set up, I commented it out.
    // You can set it up using context or state at a higher level component.
    console.log("Component mounted");
  }, []);

  return (
    <div>
      <div className="header">
        <div className="logo">
          <a href="/public">
            <span>Memobit</span>&nbsp;<span>Playground</span>
          </a>
        </div>
        <div className="themeSelectorContainer">
          {/* <mem-theme-selector></mem-theme-selector> This is a custom Angular component that needs to be converted */}
        </div>
      </div>

      <div className="playgroundContainer">
        <Playground />
      </div>
    </div>
  );
};

export default AppComponent;
