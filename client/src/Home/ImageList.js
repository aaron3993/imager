import React from "react";
import ImageCard from "./ImageCard";

import "./ImageList.css";

const ImageList = (props) => {
  const { images, albums } = props;
  const imageList = images.map((image) => {
    return <ImageCard key={image.id} image={image} albums={albums} />;
  });
  return <ul className="image-list">{imageList}</ul>;
};

export default ImageList;
