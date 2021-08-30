import React from "react";

export default function Sidebar(props) {
  const handleFilter = props.onClickHandler;
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <i className="fa-solid fa-plus fa-lg"></i>New
        </li>
        <li onClick={handleFilter.bind(this, null)}>
          <i className="fa-solid fa-hard-drive fa-lg"></i>Drive
        </li>
        <li onClick={handleFilter.bind(this, "file")}>
          <i className="fa-solid fa-file fa-lg"></i>Files
        </li>
        <li onClick={handleFilter.bind(this, "folder")}>
          <i className="fa-solid fa-folder-open fa-lg"></i>Folders
        </li>
      </ul>
      <div className="line"></div>
    </nav>
  );
}
