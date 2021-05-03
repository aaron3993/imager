import React, { useState, useEffect } from "react";
import axios from "axios";

import CollectionImageCard from "./CollectionImageCard";
import "../Home/ImageList.css";
import "../Home/Home.css";

const CollectionList = (props) => {
  const { albums } = props;
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
        albums={albums}
        collectionImage={collectionImage}
        collectionImages={collectionImages}
        setCollectionImages={setCollectionImages}
      />
    );
  });

  return (
    <div className="text-center">
      <div className="heading">
        <h1 className="mt-3 mb-3">Collection</h1>
      </div>
      <ul className="image-list">{collectionList}</ul>
    </div>
  );
};

export default CollectionList;
