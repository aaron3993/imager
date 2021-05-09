import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AlbumImageCard from "./AlbumImageCard";

import "../Home/ImageList.css";
import "../Home/ImageCard.css";

const AlbumView = (props) => {
  const { id } = useParams();
  const { images, setImages } = props;
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAlbumImages() {
      const response = await axios.get(
        `http://localhost:8080/albums/${id}/images`
      );
      setImages(response.data);
    }

    async function getAlbums() {
      const albumResponse = await axios.get(
        `http://localhost:8080/albums/${id}`
      );
      console.log(albumResponse.data);
      setAlbum(albumResponse.data);

      setLoading(false);
    }

    getAlbumImages();
    getAlbums();
  }, []);

  const imageList = images.map((albumImage, i) => {
    return (
      <AlbumImageCard
        key={i}
        albumImage={albumImage}
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
    <div>
      <div className="heading text-center">
        <h1 className="mt-3 mb-3">{album.title}</h1>
      </div>
      {images.length ? (
        <div className="image-list">{imageList}</div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="image-card">
            <div className="card-image text-center">
              <div className="p-3 bg-dark h-100 w-100 text-light d-flex flex-column justify-content-center align-items-center">
                <h3>Your album is empty,</h3>
                <h3>
                  <u>
                    <a href="/"> add some images!</a>
                  </u>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumView;
