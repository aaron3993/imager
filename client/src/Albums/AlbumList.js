import React, { useState, useEffect } from "react";
import axios from "axios";

import AlbumCard from "./AlbumCard";
// import "../Home/CardList.css";

const AlbumList = (props) => {
  const { albums, setAlbums } = props;
  const [title, setTitle] = useState("");
  const [albumCards, setAlbumCards] = useState([]);

  async function addAlbum() {
    try {
      await axios.post("http://localhost:8080/albums", {
        title: title,
      });
      console.log("Post request successful");
    } catch (err) {
      console.log(err);
    }
  }

  const albumList = albums.map((album) => {
    return (
      <AlbumCard
        key={album._id}
        title={album.title}
        album={album}
        albums={albums}
        setAlbums={setAlbums}
      />
    );
  });

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
