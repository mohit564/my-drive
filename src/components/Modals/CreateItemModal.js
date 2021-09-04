import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import path from "path";

import ErrorModal from "./ErrorModal";

import "./Modal.css";

import { ItemsContext } from "../../App";

const API_URL = "http://localhost:5000/api/users/test";
const server = axios.create({ baseURL: API_URL });

export default function CreateItemModal(props) {
  const { state1, fetchItems } = useContext(ItemsContext);
  const items = state1[0];
  const directories = items.filter((item) => item.type === "folder");

  const initialValues = {
    name: "",
    type: "",
    path: "",
  };

  function onSubmit(event) {
    event.preventDefault();
    createItem();
  }

  function validate(values) {
    let errors = {};

    if (!values.name) errors.name = "Required";
    if (!values.type) errors.type = "Required";
    if (!values.path) errors.path = "Required";

    if (values.type === "folder") {
      errors.name = /^(\w+\.?)*\w+$/.test(values.name)
        ? ""
        : "Invalid Folder Name";
    }

    if (values.type === "file") {
      errors.name = /^[^<>:;,?"*|/]+$/.test(values.name)
        ? ""
        : "Invalid File Name";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  const [error, setError] = useState({});
  const closeModal = props.onClickHandler;

  async function createItem() {
    try {
      await server.post("/", {
        name: formik.values.name,
        type: formik.values.type,
        path: formik.values.path,
      });
    } catch (error) {
      setError({ message: error.response.data.message });
    } finally {
      closeModal();
      fetchItems();
    }
  }

  return (
    <>
      {error.message && <ErrorModal error={error} setError={setError} />}
      {!error.message && (
        <div
          className="modal"
          onClick={() => {
            closeModal();
          }}
          style={{ display: props.display }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>Create File or Directory</h2>
            <form onSubmit={onSubmit} method="post">
              <ul>
                <li>
                  <label>
                    Name
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      autoComplete="off"
                    />
                  </label>
                  {formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </li>
                <li>
                  <label>
                    Type
                    <select
                      name="type"
                      onChange={formik.handleChange}
                      value={formik.values.type}
                    >
                      <option value="">Select Type</option>
                      <option value="file">File</option>
                      <option value="folder">Folder</option>
                    </select>
                    {formik.errors.type ? (
                      <div className="error">{formik.errors.type}</div>
                    ) : null}
                  </label>
                </li>
                <li>
                  <label>
                    Path
                    <select
                      name="path"
                      onChange={formik.handleChange}
                      value={formik.values.path}
                    >
                      <option value="">Select Path</option>
                      <option>home/test</option>
                      {directories.map((directory) => {
                        const item = path.join(directory.path, directory.name);
                        return <option key={item}>{item}</option>;
                      })}
                    </select>
                    {formik.errors.path ? (
                      <div className="error">{formik.errors.path}</div>
                    ) : null}
                  </label>
                </li>
                <button type="submit">CREATE</button>
              </ul>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
