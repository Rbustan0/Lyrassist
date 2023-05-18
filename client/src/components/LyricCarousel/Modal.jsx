import Styles from "./Modal.module.css";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { EDIT_LYRIC } from "../../utils/mutations";
import Styles1 from "./Button.module.css";
import LyricCarousel from "./App";
import Profile from "../../pages/Profile";


const reload=()=>window.location.reload(false);

function EditModal({ lyrics: { text, id, title } }) {
  const [showModal, setShowModal] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState(text);
  const [editLyric] = useMutation(EDIT_LYRIC);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmit = async (id, text) => {
    try {
      await editLyric({
        variables: {
          id: id,
          lyricText: text,
        },
      });
      handleCloseModal();
      reload();
    } catch (error) {
      console.error("Error editing lyric:", error);
    }
  };

  return (
    <>
      <Button variant="primary" className={Styles1.btn} onClick={handleOpenModal}  style={{ backgroundColor: '#cf23cf', borderColor: '#cf23cf' }}>
        Edit lyrics
      </Button>

      <Modal className={Styles.M} show={showModal} >
        <Modal.Header closeButton onClick={handleCloseModal}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Edit Text:</Form.Label>
            <textarea
              className={Styles.modal} 
              value={textFieldValue}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit(id, textFieldValue)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
