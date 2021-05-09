import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import Select from "react-select";
import axios from "axios";

import ImageModal from "../ImageModal";
import "./ImageCard.css";

const ImageCard = (props) => {
  const { image, albums } = props;
  const [option, setOption] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [validAlbum, setValidAlbum] = useState(false);
  const [validAlbumMsg, setValidAlbumMsg] = useState("");
  const [invalidAlbum, setInvalidAlbum] = useState(false);
  const [invalidAlbumMsg, setInvalidAlbumMsg] = useState("");
  const [validCollection, setValidCollection] = useState(false);
  const [validCollectionMsg, setValidCollectionMsg] = useState("");
  const [invalidCollection, setInvalidCollection] = useState(false);
  const [invalidCollectionMsg, setInvalidCollectionMsg] = useState("");
  const [noAlbum, setNoAlbum] = useState(false);
  const [noAlbumMsg, setNoAlbumMsg] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setSelectedAlbum(albums.find((album) => album.title === option.value));
  }, [option]);

  async function addToCollection() {
    try {
      const res = await axios.post(
        "http://localhost:8080/images/collection",
        image
      );
      if (res.data.invalid) {
        setValidCollection(false);
        setInvalidCollection(true);
        setInvalidCollectionMsg(res.data.invalid);
        setTimeout(() => {
          setInvalidCollection(false);
        }, 3000);
      } else {
        setInvalidCollection(false);
        setValidCollection(true);
        setValidCollectionMsg(res.data.valid);
        setTimeout(() => {
          setValidCollection(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addToAlbum() {
    try {
      const res = await axios.post(`http://localhost:8080/images/album`, {
        album: selectedAlbum,
        image: image,
      });
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

  const options = albums.map((album) => {
    return { value: album.title, label: album.title };
  });

  return (
    <div className="image-card">
      <div className="card-image">
        <img
          src={image.urls.regular}
          alt={image.alt_description}
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
          <a href={`/albums/${selectedAlbum._id}`}>Go to album</a>
        </span>
      ) : null}
      {invalidAlbum ? <span className="invalid">{invalidAlbumMsg}</span> : null}
      {noAlbum ? (
        <span className="invalid">
          {noAlbumMsg} <a href="/albums">Create an album</a>
        </span>
      ) : null}
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => addToCollection()}
      >
        Save to Collection
      </Button>
      {validCollection ? (
        <span className="valid">
          {validCollectionMsg} <a href="/collection">Go to collection</a>
        </span>
      ) : null}
      {invalidCollection ? (
        <span className="invalid">{invalidCollectionMsg}</span>
      ) : null}
      <ImageModal
        image={image}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ImageCard;
