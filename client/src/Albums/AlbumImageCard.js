import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";

import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const AlbumImageCard = (props) => {
  const { image, images, setImages, album } = props;

  function removeFromAlbum() {
    try {
      axios.delete(`http://localhost:8080/images/album/${image._id}`, image);
      const imageToBeRemovedIndex = images.findIndex(
        (imageCard) => image === imageCard
      );
      const imagesCopy = [...images];
      imagesCopy.splice(imageToBeRemovedIndex, 1);
      setImages(imagesCopy);
    } catch (err) {
      console.log(err);
    }
  }

  // async function addToCollection() {
  //   try {
  //     await axios.post("http://localhost:8080/images", image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div>
      <div className="image-card">
        <div className="card-image">
          <img src={image.url} alt={image} />
        </div>
        {/* <button onClick={() => addToCollection()}>Add</button> */}
        <Button
          className="p-1 mt-1 w-50"
          color="primary"
          type="submit"
          onClick={() => removeFromAlbum()}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default AlbumImageCard;
