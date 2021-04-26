import React from "react";
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

  async function removeImage() {
    try {
      await axios.delete(`http://localhost:8080/images/${collectionImage._id}`);
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
      <img src={collectionImage.url} alt={collectionImage.alt_description} />
      <button onClick={() => addToAlbum()}>Add</button>
      <button onClick={() => removeImage()}>Remove</button>
    </div>
  );
};

export default CollectionImageCard;
