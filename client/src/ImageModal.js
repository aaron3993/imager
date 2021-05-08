import React from "react";
import { Modal, Card } from "react-bootstrap";

function ImageModal(props) {
  const image = props.image;
  const collectionImage = props.collectionImage;
  const albumImage = props.albumImage;

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Card.Img
          variant="top"
          src={
            image
              ? image.urls.regular
              : collectionImage
              ? collectionImage.url
              : albumImage.url
          }
          alt={
            image
              ? image.alt_description
              : collectionImage
              ? collectionImage.description
              : albumImage.url
          }
        />
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;
