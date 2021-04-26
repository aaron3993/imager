import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "./ImageCard.css";

const ImageCard = (props) => {
  const { image, albums } = props;
  const [option, setOption] = useState("");

  async function addToCollection() {
    try {
      await axios.post("http://localhost:8080/images", image);
      console.log("Post request successful");
    } catch (err) {
      console.log(err);
    }
  }

  async function addToAlbum(image, album) {
    try {
      await axios.post(`http://localhost:8080/albums/${album._id}`, {
        image: image,
      });
      console.log("Post request successful");
    } catch (err) {
      console.log(err);
    }
  }

  const options = albums.map((album) => {
    return { value: album.title, label: album.title };
  });

  console.log(options);
  return (
    <div className="image-card">
      <div className="card-image">
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
      <Select
        options={options}
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Select an album"
      />
      <button onClick={() => addToAlbum(image.urls.regular, option)}>
        Add to Album
      </button>
      <button onClick={() => addToCollection()}>Add</button>
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
