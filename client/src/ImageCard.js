import React from "react";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "./ImageCard.css";

const ImageCard = (props) => {
  const image = props.image;

  function addToCollection() {
    axios.post("/");
  }
  return (
    <div className="image-card">
      <img src={image.urls.regular} alt={image.alt_description} />
      <button onClick={addToCollection()}>Add</button>
      {/* <h3 className="image-description">{image.description}</h3> */}
      {/* <AddToAlbumButton
        className="add-to-album-button"
        albums={props.albums}
        url={props.image.urls.regular}
        description={props.image.alt_description}
      /> */}
    </div>
  );
};

export default ImageCard;
