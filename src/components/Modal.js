import React, { useContext } from "react";
import axios from "axios";
import path from "path";

import "./Modal.css";

import { ItemsContext } from "../App";

const API_URL = "http://localhost:5000/api/users/test";
const server = axios.create({ baseURL: API_URL });

export default function Modal(props) {
  const { state1, fetchItems } = useContext(ItemsContext);
  const items = state1[0];
  const directories = items.filter((item) => item.type === "folder");

  const display = props.display;
  const closeModal = props.onClickHandler;

  function createItem(event) {
    event.preventDefault();
    server
      .post("/", {
        name: event.target[0].value,
        type: event.target[1].value,
        path: event.target[2].value,
      })
      .then(async () => {
        await fetchItems(event);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        event.target.reset();
        closeModal();
      });
  }

  return (
    <div className="modal" onClick={closeModal} style={{ display: display }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <h2>Create File or Directory</h2>
        <form onSubmit={createItem}>
          <ul>
            <li>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  required
                />
              </label>
            </li>
            <li>
              <label>
                Type
                <select name="type" required>
                  <option value="">Select Type</option>
                  <option value="file">File</option>
                  <option value="folder">Folder</option>
                </select>
              </label>
            </li>
            <li>
              <label>
                Path
                <select name="path" required>
                  <option value="">Select Path</option>
                  <option>home/test</option>
                  {directories.map((directory) => {
                    const item = path.join(directory.path, directory.name);
                    return <option key={item}>{item}</option>;
                  })}
                </select>
              </label>
            </li>
            <button>CREATE</button>
          </ul>
        </form>
      </div>
    </div>
  );
}
