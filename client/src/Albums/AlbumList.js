import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import AlbumCard from "./AlbumCard";
import "../Home/ImageList.css";
// import "../Home/CardList.css";

const AlbumList = (props) => {
  const { images, setImages, albums, setAlbums } = props;
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false);
  const [validMsg, setValidMsg] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState("");

  async function createAlbum(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/albums", {
        title: title,
      });
      if (res.data.invalid) {
        setValid(false);
        setInvalid(true);
        setInvalidMsg(res.data.invalid);
        setTimeout(() => {
          setInvalid(false);
        }, 2000);
      } else {
        setInvalid(false);
        setValid(true);
        setValidMsg(
          `'${res.data.newAlbum.title}' has been successfully created!`
        );
        setTimeout(() => {
          setValid(false);
        }, 2000);
      }
      if (res.data.newAlbum) {
        setAlbums([...albums, res.data.newAlbum]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const albumList = albums
    ? albums.map((albumCard) => {
        return (
          <AlbumCard
            key={albumCard._id}
            images={images}
            setImages={setImages}
            albumCard={albumCard}
            albums={albums}
            setAlbums={setAlbums}
          />
        );
      })
    : null;

  return (
    <div className="mt-3 text-center">
      <h1>Albums</h1>
      <Form
        className="d-flex flex-column align-items-center"
        onSubmit={(e) => createAlbum(e)}
      >
        <FormGroup>
          <Input
            type="text"
            placeholder="Create a new album"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            Create
          </Button>
        </FormGroup>
        {valid ? <span className="valid">{validMsg}</span> : null}
        {invalid ? <span className="invalid">{invalidMsg}</span> : null}
      </Form>
      <ul className="image-list">{albumList}</ul>
      {/* <div>
        {albums.length ? (
          <ul className="image-list">{albumList}</ul>
        ) : (
          <p>You do not have any albums.</p>
        )}
      </div> */}
    </div>
  );
};

export default AlbumList;
