import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";

import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const AlbumImageCard = (props) => {
  const { image, images, setImages, album } = props;
  console.log({ image });
  function removeFromAlbum() {
    try {
      axios.patch(`http://localhost:8080/images/album/${image._id}`, image);
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

  // const [option, setOption] = useState("");
  // const [selectedAlbum, setSelectedAlbum] = useState({});
  // console.log(images);

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
      <div className="image-card">
        <div className="card-image">
          <img src={image.url} alt={image} />
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
        {/* <button onClick={() => removeFromAlbum()}>Remove From Album</button> */}
        <Button
          className="p-0 mt-1 w-50"
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
