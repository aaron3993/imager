import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CollectionImageCard from "./CollectionImageCard";
import "../Home/ImageList.css";
import "../Home/Home.css";
import "../Home/Welcome.css";
import "../Home/ImageCard.css";

const CollectionList = (props) => {
  const { albums } = props;
  const [collectionImages, setCollectionImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCollection() {
      let res = await axios.get("http://localhost:8080/images/collection");
      setCollectionImages(res.data);
      setLoading(false);
    }

    getCollection();
  }, [collectionImages]);

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

  if (loading) {
    return null;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="heading">
        <h1 className="mt-3 mb-3">Collection</h1>
        <p>
          View all images you have saved, remove them, or add them to albums
        </p>
      </div>
      {collectionImages.length ? (
        <ul className="image-list mt-3">{collectionList}</ul>
      ) : (
        <div className="image-card mt-5 text-center">
          <div className="welcome-container p-3 bg-dark text-light">
            <h3>
              Your collection is empty,{" "}
              <span>
                <u>
                  <Link to="/">add some images!</Link>
                </u>
              </span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionList;
