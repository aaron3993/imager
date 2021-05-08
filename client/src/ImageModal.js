import React from "react";
import { Modal, Card } from "react-bootstrap";

function ImageModal(props) {
  const image = props.image;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Recording</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <Card.Img
          variant="top"
          src={image.urls.regular}
          alt={image.alt_description}
        />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default ImageModal;
