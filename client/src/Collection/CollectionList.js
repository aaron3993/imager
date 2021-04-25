import React, { useState, useEffect } from "react";
import axios from "axios";

import CollectionImageCard from "./CollectionImageCard";
import "../Home/ImageList.css";

const CollectionList = (props) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function getImages() {
      let res = await axios.get("http://localhost:8080/images");
      setCollection(res.data);
    }

    getImages();
  }, []);

  const collectionList = collection.map((image) => {
    return <CollectionImageCard key={image._id} image={image} />;
  });

  return (
    <div>
      <ul>{collectionList}</ul>
    </div>
  );
};

export default CollectionList;
