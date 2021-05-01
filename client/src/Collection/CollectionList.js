import React, { useState, useEffect } from "react";
import axios from "axios";

import CollectionImageCard from "./CollectionImageCard";
import "../Home/ImageList.css";

const CollectionList = (props) => {
  const [collectionImages, setCollectionImages] = useState([]);

  useEffect(() => {
    async function getCollection() {
      let res = await axios.get("http://localhost:8080/images/collection");
      setCollectionImages(res.data);
    }

    getCollection();
  }, []);

  const collectionList = collectionImages.map((collectionImage) => {
    return (
      <CollectionImageCard
        key={collectionImage._id}
        collectionImage={collectionImage}
        collectionImages={collectionImages}
        setCollectionImages={setCollectionImages}
      />
    );
  });

  return (
    <div>
      <ul>{collectionList}</ul>
    </div>
  );
};

export default CollectionList;
