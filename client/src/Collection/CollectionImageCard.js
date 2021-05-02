import React, { useState, useEffect } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const CollectionImageCard = (props) => {
  const {
    albums,
    collectionImage,
    collectionImages,
    setCollectionImages,
  } = props;
  const [option, setOption] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [validAlbum, setValidAlbum] = useState(false);
  const [validAlbumMsg, setValidAlbumMsg] = useState("");
  const [invalidAlbum, setInvalidAlbum] = useState(false);
  const [invalidAlbumMsg, setInvalidAlbumMsg] = useState("");

  useEffect(() => {
    setSelectedAlbum(albums.find((album) => album.title === option.value));
  }, [option]);

  // async function addToAlbum() {
  //   try {
  //     await axios.post("http://localhost:8080/albums", collectionImage);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function addToAlbum(image) {
    try {
      const res = await axios.post(`http://localhost:8080/images/album`, {
        album: selectedAlbum,
        image: image,
      });
      if (res.data.invalid) {
        setValidAlbum(false);
        setInvalidAlbum(true);
        setInvalidAlbumMsg(res.data.invalid);
        setTimeout(() => {
          setInvalidAlbum(false);
        }, 2000);
      } else {
        setInvalidAlbum(false);
        setValidAlbum(true);
        setValidAlbumMsg(res.data.valid);
        setTimeout(() => {
          setValidAlbum(false);
        }, 2000);
      }
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

  const options = albums.map((album) => {
    return { value: album.title, label: album.title };
  });

  return (
    <div className="image-card">
      <div className="card-image">
        <img src={collectionImage.url} alt={collectionImage.alt_description} />
      </div>

      <Select
        className="w-75"
        options={options}
        value={option}
        onChange={setOption}
        placeholder="Select an album"
      />
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => addToAlbum(collectionImage.url)}
      >
        Add
      </Button>
      {validAlbum ? <span className="valid">{validAlbumMsg}</span> : null}
      {invalidAlbum ? <span className="invalid">{invalidAlbumMsg}</span> : null}
      <Button
        className="p-1 mt-1 w-75"
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
