import React, { useEffect } from "react";

import { Playground } from "../playground/playground.tsx";

import {setTheme} from "@memobit/services/theme.service.ts";

import "./app.scss";

let initialized = false;


const AppComponent = (): React.ReactNode => {
  useEffect(() => {
      if (!initialized){
          setTheme('assets');
      }

      initialized = true;
  }, []);

  return (
    <div>
      <div className="header">
        <div className="logo">
          <a href="/public">
            <span>Memobit React</span>&nbsp;<span>Playground</span>
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
