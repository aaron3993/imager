import React, { useState, useEffect } from "react";
import axios from "axios";

import AlbumCard from "./AlbumCard";
// import "../Home/CardList.css";

const AlbumList = (props) => {
  const { albums, setAlbums, setAlbumImages } = props;
  const [title, setTitle] = useState("");

  async function addAlbum() {
    try {
      const res = await axios.post("http://localhost:8080/albums", {
        title: title,
      });
      setAlbums([...albums, res.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const albumList = albums
    ? albums.map((albumCard) => {
        return (
          <AlbumCard
            key={albumCard._id}
            title={albumCard.title}
            albumCard={albumCard}
            albums={albums}
            setAlbums={setAlbums}
            setAlbumImages={setAlbumImages}
          />
        );
      })
    : null;

  return (
    <div>
      <h1>Albums</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => addAlbum(title)}>Add Album</button>
      <div>
        {albums.length ? (
          <ul>{albumList}</ul>
        ) : (
          <p>You do not have any albums.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumList;
