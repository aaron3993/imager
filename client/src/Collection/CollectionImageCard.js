import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Select from "react-select";
import axios from "axios";

import ImageModal from "../ImageModal";

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
  const [noAlbum, setNoAlbum] = useState(false);
  const [noAlbumMsg, setNoAlbumMsg] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setSelectedAlbum(albums.find((album) => album.title === option.value));
  }, [option]);

  async function addToAlbum() {
    try {
      const res = await axios.post(
        `https://imager-album.herokuapp.com/images/album`,
        {
          album: selectedAlbum,
          collectionImage: collectionImage,
        }
      );
      if (res.data.invalid) {
        setValidAlbum(false);
        setNoAlbum(false);
        setInvalidAlbum(true);
        setInvalidAlbumMsg(res.data.invalid);
        setTimeout(() => {
          setInvalidAlbum(false);
        }, 3000);
      } else if (res.data.noAlbum) {
        setValidAlbum(false);
        setInvalidAlbum(false);
        setNoAlbum(true);
        setNoAlbumMsg(res.data.noAlbum);
        setTimeout(() => {
          setNoAlbum(false);
        }, 3000);
      } else {
        setInvalidAlbum(false);
        setNoAlbum(false);
        setValidAlbum(true);
        setValidAlbumMsg(res.data.valid);
        setTimeout(() => {
          setValidAlbum(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromCollection() {
    try {
      await axios.delete(
        `https://imager-album.herokuapp.com/images/collection/${collectionImage._id}`
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
        <img
          src={collectionImage.url}
          alt={collectionImage.alt_description}
          onClick={() => setModalShow(true)}
        />
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
        onClick={() => addToAlbum()}
      >
        Add to Album
      </Button>
      {validAlbum ? (
        <span className="valid">
          {validAlbumMsg}{" "}
          <Link to={`/albums/${selectedAlbum._id}`}>Go to album</Link>
        </span>
      ) : null}
      {invalidAlbum ? <span className="invalid">{invalidAlbumMsg}</span> : null}
      {noAlbum ? (
        <span className="invalid">
          {noAlbumMsg} <Link to="/albums">Create an album</Link>
        </span>
      ) : null}
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => removeFromCollection()}
      >
        Delete Image
      </Button>
      <ImageModal
        collectionImage={collectionImage}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default CollectionImageCard;
