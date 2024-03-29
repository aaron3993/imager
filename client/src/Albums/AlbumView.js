import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";

import AlbumImageCard from "./AlbumImageCard";

import "../Home/ImageList.css";
import "../Home/ImageCard.css";
import "../Home/Welcome.css";

const AlbumView = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const { images, setImages } = props;
  const [album, setAlbum] = useState({});
  const [albumLoading, setAlbumLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    async function getAlbum() {
      const albumResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/albums/${id}`
      );
      setAlbum(albumResponse.data);
      setAlbumLoading(false);
    }

    getAlbum();
  }, []);

  useEffect(() => {
    async function getAlbumImages() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/albums/${id}/images`
      );
      setImages(response.data);
      setImagesLoading(false);
    }

    getAlbumImages();
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

  if (albumLoading || imagesLoading) {
    return null;
  }

  if (!album) {
    return (
      <>
        <div className="heading text-center">
          <h1 className="mt-3 mb-3">Album Deleted</h1>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <div className="image-card">
            <div className="card-image text-center">
              <div className="p-3 bg-dark h-100 w-100 text-light d-flex flex-column justify-content-center align-items-center">
                <h3>This album has been deleted</h3>
                <h3>
                  <u>
                    <Link to="/albums">Create a new album!</Link>
                  </u>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="heading text-center">
        <h1 className="mt-3 mb-3">{album.title}</h1>
      </div>

      {images.length ? (
        <div className="image-list mt-3">{imageList}</div>
      ) : (
        <div className="mt-5 d-flex justify-content-center">
          <div className="image-card">
            <div className="card-image text-center">
              <div className="welcome-container p-3 bg-dark text-light flex-column justify-content-center">
                <h3>Your album is empty,</h3>
                <h3>
                  <u>
                    <Link to="/"> add some images!</Link>
                  </u>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-50 m-auto text-center">
        <Button
          className="mt-1 w-25"
          color="primary"
          type="submit"
          onClick={() => history.push("/albums")}
        >
          Back to Albums
        </Button>
      </div>
    </div>
  );
};

export default AlbumView;
