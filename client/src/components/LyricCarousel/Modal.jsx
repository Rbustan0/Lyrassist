import Styles from "./Modal.module.css";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { EDIT_LYRIC } from "../../utils/mutations";

function EditModal({ lyrics: { text, id } }) {
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
    } catch (error) {
      console.error("Error editing lyric:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Edit lyrics
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Text Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Text Field</Form.Label>
            <Form.Control
              type="textarea"
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
