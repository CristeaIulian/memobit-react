import React from "react";
import { Link } from "react-router-dom";
import { ListItems } from "./types.ts";

import "./list.scss";

interface ListComponentProps {
  items: ListItems[];
}

// @Todo: move this to memobit-react
export const List = ({ items }: ListComponentProps) => {
  return (
    <div className="main">
      {items.map((category, index) => (
        <React.Fragment key={index}>
          <label className="title">{category.label}</label>
          <ul>
            {category.items.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={item.isSelected ? "isSelected" : ""}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
};
