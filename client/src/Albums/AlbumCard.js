import React from "react";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

// import "./ImageCard.css";

const AlbumCard = (props) => {
  const { albumCard, albums, setAlbums, title } = props;
  console.log(albumCard._id);

  async function deleteAlbum() {
    try {
      await axios.delete(`http://localhost:8080/albums/${albumCard._id}`);
      console.log("deleting");
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
      {/* <button onClick={() => viewAlbum()}>View</button> */}
      <button onClick={() => deleteAlbum()}>Delete</button>
    </div>
  );
};

export default AlbumCard;
