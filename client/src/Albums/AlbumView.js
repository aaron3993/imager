import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AlbumImageCard from "./AlbumImageCard";

import "../Home/ImageList.css";

const AlbumView = (props) => {
  const { title } = useParams();
  const [images, setImages] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`http://localhost:8080/albums/${title}`);
    setImages(response.data);
  }, []);

  const imageList = images.map((image, i) => {
    return <AlbumImageCard image={image} />;
  });
  return (
    <div>
      <h1>Images</h1>
      <div className="image-list">{imageList}</div>;
    </div>
  );
};

export default AlbumView;
