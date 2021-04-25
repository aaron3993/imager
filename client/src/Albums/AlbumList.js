import React, { useState, useEffect } from "react";
import axios from "axios";

import AlbumCard from "./AlbumCard";
// import "../Home/CardList.css";

const AlbumList = (props) => {
  const { albums, setAlbums } = props;
  console.log(albums);
  const [albumCards, setAlbumCards] = useState([]);

  const albumList = albums.map((album) => {
    // return (
    //   <AlbumCard
    //     key={album._id}
    //     album={album}
    //     albums={albums}
    //     setAlbums={setAlbums}
    //   />
    // );
  });

  return (
    <div>
      <h1>Albums</h1>
      <input />
      <button>Add Album</button>
      <ul>{albumList}</ul>
    </div>
  );
};

export default AlbumList;
