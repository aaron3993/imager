import React from "react";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const CollectionImageCard = (props) => {
  const { collectionImage, collectionImages, setCollectionImages } = props;
  console.log(collectionImage);

  async function addToAlbum() {
    try {
      await axios.post("http://localhost:8080/albums", collectionImage);
      console.log("Post request successful");
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
      {/* <h3 className="collectionImage-description">{collectionImage.description}</h3> */}
      {/* <AddToAlbumButton
        className="add-to-album-button"
        albums={props.albums}
        url={props.collectionImage.urls.regular}
        description={props.collectionImage.alt_description}
      /> */}
    </div>
  );
};

export default CollectionImageCard;
