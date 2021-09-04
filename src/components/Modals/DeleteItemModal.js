import React, { useState, useContext } from "react";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import { ItemsContext } from "../../App";

const API_URL = "http://localhost:5000/api/users/test";
const server = axios.create({ baseURL: API_URL });

const DeleteItemModal = (props) => {
  const { fetchItems } = useContext(ItemsContext);
  const item = props.item;
  const display = props.display;
  const closeModal = props.onClickHandler;

  const [error, setError] = useState({});

  async function deleteItem() {
    try {
      await server.delete("", { data: { ...item } });
      fetchItems();
    } catch (error) {
      setError({ message: error.response.data.message });
    } finally {
      closeModal();
    }
  }

  return (
    <>
      {error.message && <ErrorModal error={error} setError={setError} />}
      <div className="modal" onClick={closeModal} style={{ display: display }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={closeModal}>
            &times;
          </span>
          <h2 className="modal-title">Warning</h2>
          <h4 className="modal-body">
            Are you sure you want to delete this item?
          </h4>
          <div className="modal-cta">
            <button onClick={deleteItem}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteItemModal;
