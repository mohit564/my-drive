import React, { useContext } from "react";
import path from "path";
import Item from "./Item";

import { ItemsContext } from "../App";

export default function Items() {
  const { state2 } = useContext(ItemsContext);
  const filteredItems = state2[0];
  return (
    <div className="content">
      {filteredItems.map((item) => (
        <Item key={path.join(item.path, item.name)} item={item} />
      ))}
    </div>
  );
}
