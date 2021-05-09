import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";

import "../Home/ImageCard.css";

const AlbumCard = (props) => {
  const { albumCard, albums, setAlbums } = props;
  const [loading, setLoading] = useState(true);
  const [coverImage, setCoverImage] = useState({});
  let history = useHistory();

  useEffect(() => {
    async function getAlbumCoverImage() {
      const response = await axios.get(
        `http://localhost:8080/albums/${albumCard._id}/image`
      );
      setCoverImage(response.data);
      setLoading(false);
    }

    getAlbumCoverImage();
  }, []);

  async function deleteAlbum() {
    try {
      await axios.delete(`http://localhost:8080/albums/${albumCard._id}`);
      const albumToBeRemovedIndex = albums.findIndex(
        (album) => album._id === albumCard._id
      );
      const albumsCopy = [...albums];
      albumsCopy.splice(albumToBeRemovedIndex, 1);
      setAlbums(albumsCopy);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="image-card">
      <h3>{albumCard.title}</h3>
      <div className="card-image text-center">
        {loading ? null : coverImage ? (
          <img
            src={coverImage.url}
            alt={coverImage.url}
            onClick={() => history.push(`/albums/${albumCard._id}`)}
          />
        ) : (
          <div className="p-3 bg-dark h-100 w-100 text-light d-flex flex-column justify-content-center align-items-center">
            <h3>Your album is empty,</h3>
            <h3>
              <u>
                <a href="/"> add some images!</a>
              </u>
            </h3>
          </div>
        )}
      </div>

      <div className="form">
        <Button
          className="mt-1 w-75"
          color="primary"
          type="submit"
          onClick={() => history.push(`/albums/${albumCard._id}`)}
        >
          View Images
        </Button>
        <Button
          className="w-75"
          color="primary"
          type="submit"
          onClick={() => deleteAlbum()}
        >
          Delete Album
        </Button>
      </div>
    </div>
  );
};

export default AlbumCard;
