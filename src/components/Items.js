import React from "react";
import Item from "./Item";

export default function Items(props) {
  return (
    <div className="content">
      {props.items.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </div>
  );
}
