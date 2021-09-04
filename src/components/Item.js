import React, { useState } from "react";
import DeleteItemModal from "./Modals/DeleteItemModal";

function setItemIcon(type, ext) {
  if (type === "folder") {
    return <i className="fa-regular fa-folder-open fa-lg"></i>;
  } else {
    switch (ext) {
      case "txt":
        return <i className="fa-regular fa-file-lines fa-lg"></i>;
      case "jpg":
        return <i className="fa-regular fa-file-image fa-lg"></i>;
      case "pdf":
        return <i className="fa-solid fa-file-pdf fa-lg"></i>;
      case "mp3":
        return <i className="fa-regular fa-file-audio fa-lg"></i>;
      case "mp4":
        return <i className="fa-regular fa-file-video fa-lg"></i>;
      case "xlsx":
        return <i className="fa-regular fa-file-excel fa-lg"></i>;
      default:
        return <i className="fa-regular fa-file fa-lg"></i>;
    }
  }
}

export default function Item(props) {
  const { name, type, ext, path } = props.item;
  const [deleteItemDisplay, setDeleteItemDisplay] = useState("");

  function openDeleteItemModal() {
    setDeleteItemDisplay((state) => (state = "block"));
  }

  function closeDeleteItemModal() {
    setDeleteItemDisplay((state) => (state = "none"));
  }

  return (
    <>
      {deleteItemDisplay && (
        <DeleteItemModal
          item={{ name, type, ext, path }}
          display={deleteItemDisplay}
          onClickHandler={closeDeleteItemModal}
        />
      )}
      <div className="item">
        <div className="item_icon">{setItemIcon(type, ext)}</div>
        <div className="item_text">{name}</div>
        <div className="item_delete" onClick={openDeleteItemModal}>
          &times;
        </div>
      </div>
    </>
  );
}
