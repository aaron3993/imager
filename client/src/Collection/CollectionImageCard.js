import React from "react";
import { Button, FormGroup, Input } from "reactstrap";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const CollectionImageCard = (props) => {
  const { collectionImage, collectionImages, setCollectionImages } = props;

  async function addToAlbum() {
    try {
      await axios.post("http://localhost:8080/albums", collectionImage);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromCollection() {
    try {
      await axios.patch(
        `http://localhost:8080/images/collection/${collectionImage._id}`
      );
      const collectionToBeRemovedIndex = collectionImages.findIndex(
        (image) => image._id === collectionImage._id
      );
      const collectionCopy = [...collectionImages];
      collectionCopy.splice(collectionToBeRemovedIndex, 1);
      setCollectionImages(collectionCopy);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="image-card">
      <div className="card-image">
        <img src={collectionImage.url} alt={collectionImage.alt_description} />
      </div>
      <button onClick={() => addToAlbum()}>Add</button>
      <Button
        className="p-0 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => removeFromCollection()}
      >
        Delete
      </Button>
    </div>
  );
};

export default CollectionImageCard;
