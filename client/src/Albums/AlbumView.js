import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AlbumImageCard from "./AlbumImageCard";

import "../Home/ImageList.css";

const AlbumView = (props) => {
  const { id } = useParams();
  const { images, setImages } = props;
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:8080/albums/${id}/images`
    );
    setImages(response.data);

    const albumResponse = await axios.get(`http://localhost:8080/albums/${id}`);
    setAlbum(albumResponse.data);

    setLoading(false);
  }, []);

  const imageList = images.map((image, i) => {
    return (
      <AlbumImageCard
        key={i}
        image={image}
        images={images}
        setImages={setImages}
        album={album}
      />
    );
  });

  if (loading) {
    return null;
  }

  return (
    <div className="text-center mt-3">
      <h1>{album.title}</h1>
      <div className="image-list">{imageList}</div>
    </div>
  );
};

export default AlbumView;
