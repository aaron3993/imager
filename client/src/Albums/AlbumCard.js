import React from "react";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

// import "./ImageCard.css";

const AlbumCard = (props) => {
  const { title } = props;
  //   async function addToCollection() {
  //     try {
  //       await axios.post("http://localhost:8080/images", image);
  //       console.log("Post request successful");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  return (
    <div className="image-card">
      <h3>{title}</h3>
      {/* <button onClick={() => addToAlbum()}>Add to Album</button> */}
      {/* <button onClick={() => addToCollection()}>Add</button> */}
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

export default AlbumCard;
