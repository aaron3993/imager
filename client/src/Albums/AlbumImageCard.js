import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";

import ImageModal from "../ImageModal";
import "../Home/ImageCard.css";

const AlbumImageCard = (props) => {
  const { album, albumImage, images, setImages } = props;
  const [modalShow, setModalShow] = useState(false);

  function removeFromAlbum() {
    try {
      axios.delete(
        `http://localhost:8080/images/album/${album._id}/${albumImage._id}`
      );
      const imageToBeRemovedIndex = images.findIndex(
        (imageCard) => albumImage === imageCard
      );
      const imagesCopy = [...images];
      imagesCopy.splice(imageToBeRemovedIndex, 1);
      setImages(imagesCopy);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="image-card">
        <div className="card-image">
          <img
            src={albumImage.url}
            alt={albumImage.url}
            onClick={() => setModalShow(true)}
          />
        </div>
        <Button
          className="p-1 mt-1 w-50"
          color="primary"
          type="submit"
          onClick={() => removeFromAlbum()}
        >
          Remove Image
        </Button>
        <ImageModal
          albumImage={albumImage}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default AlbumImageCard;
