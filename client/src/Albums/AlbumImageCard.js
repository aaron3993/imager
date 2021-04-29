import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const AlbumImageCard = (props) => {
  const { image, albums } = props;
  console.log(history.state);
  // const [option, setOption] = useState("");
  // const [selectedAlbum, setSelectedAlbum] = useState({});
  console.log(image);

  // useEffect(() => {
  //   setSelectedAlbum(albums.find((album) => album.title === option.value));
  // }, [option]);

  // async function addToCollection() {
  //   try {
  //     await axios.post("http://localhost:8080/images", image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function addToAlbum(image, albumTitle) {
  //   try {
  //     await axios.patch(`http://localhost:8080/albums/${selectedAlbum._id}`, {
  //       image: image,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const options = albums.map((album) => {
  //   return { value: album.title, label: album.title };
  // });

  // console.log(options);
  return (
    <div>
      <h1>Images</h1>
      <div className="image-card">
        <div className="card-image">
          <img src={image} alt={image} />
        </div>
        {/* <Select
        options={options}
        value={option}
        onChange={setOption}
        placeholder="Select an album"
      />
      <button onClick={() => addToAlbum(image.urls.regular, option.value)}>
        Add to Album
      </button>
      <button onClick={() => addToCollection()}>Add</button> */}
      </div>
    </div>
  );
};

export default AlbumImageCard;
