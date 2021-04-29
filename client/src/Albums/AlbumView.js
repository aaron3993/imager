import React from "react";
import AlbumImageCard from "./AlbumImageCard";

// import "../Home/ImageList.css";

const AlbumView = (props) => {
  const { albumImages } = props;
  console.log(albumImages);
  const albumImageList = albumImages.map((image, i) => {
    console.log(image);
    return <AlbumImageCard image={image} />;
  });
  return <div className="image-list">{albumImageList}</div>;
};

export default AlbumView;
