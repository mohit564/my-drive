import React from "react";

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
  const { name, type, ext } = props.item;
  return (
    <div className="item">
      <div className="item_icon">{setItemIcon(type, ext)}</div>
      <div className="item_text">{name}</div>
      <div className="item_delete">&times;</div>
    </div>
  );
}
