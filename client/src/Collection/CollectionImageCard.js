import React from "react";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const CollectionImageCard = (props) => {
  const image = props.image;

  async function addToAlbum() {
    try {
      await axios.post("http://localhost:8080/albums", image);
      console.log("Post request successful");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="image-card">
      <img src={image.url} alt={image.alt_description} />
      <button onClick={() => addToAlbum()}>Add</button>
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

export default CollectionImageCard;
