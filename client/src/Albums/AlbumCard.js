import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

// import "./ImageCard.css";

const AlbumCard = (props) => {
  const { albumCard, albums, setAlbums, title, setAlbumImages } = props;
  let history = useHistory();

  async function viewAlbum() {
    try {
      const response = await axios.get(
        `http://localhost:8080/albums/${albumCard.title}`
      );
      setAlbumImages(response.data);
      history.push({
        pathname: `/albums/${albumCard.title}`,
        state: { images: response.data },
      });
      // const albumToBeRemovedIndex = albums.findIndex(
      //   (album) => album._id === albumCard._id
      // );
      // const albumsCopy = [...albums];
      // albumsCopy.splice(albumToBeRemovedIndex, 1);
      // setAlbums(albumsCopy);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAlbum() {
    try {
      await axios.delete(`http://localhost:8080/albums/${albumCard._id}`);
      const albumToBeRemovedIndex = albums.findIndex(
        (album) => album._id === albumCard._id
      );
      const albumsCopy = [...albums];
      albumsCopy.splice(albumToBeRemovedIndex, 1);
      setAlbums(albumsCopy);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="image-card">
      <h3>{title}</h3>
      <button onClick={() => viewAlbum()}>View</button>
      <button onClick={() => deleteAlbum()}>Delete</button>
    </div>
  );
};

export default AlbumCard;
