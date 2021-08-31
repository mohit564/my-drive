import React, { useState, useContext } from "react";
import { ItemsContext } from "../App";

import Modal from "./Modal";

export default function Sidebar() {
  const { state1, state2 } = useContext(ItemsContext);
  const items = state1[0];
  const setFilteredItems = state2[1];

  const [modal, setModal] = useState({ display: "none" });

  function openModal() {
    setModal({ display: "block" });
  }

  function closeModal() {
    setModal({ display: "none" });
  }

  function handleFilter(type) {
    if (!type) setFilteredItems(items);
    else setFilteredItems(items.filter((item) => item.type === type));
  }

  return (
    <>
      <Modal display={modal.display} onClickHandler={closeModal} />
      <nav className="sidebar">
        <ul>
          <li onClick={openModal}>
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
    </>
  );
}
