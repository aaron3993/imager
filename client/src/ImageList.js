import React from "react";
import ImageCard from "./ImageCard";

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <ImageCard key={image.id} image={image}></ImageCard>;
  });
  return <div className="image-list">{images}</div>;
};

export default ImageList;
