import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./Navbar";
import Home from "./Home/Home";
import CollectionList from "./Collection/CollectionList";
import AlbumList from "./Albums/AlbumList";
import AlbumView from "./Albums/AlbumView";

import "bootstrap/dist/css/bootstrap.css";

const App = (props) => {
  const [images, setImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAlbums() {
      let res = await axios.get("http://localhost:8080/albums");
      setAlbums(res.data);
      setLoading(false);
    }

    getAlbums();
  }, []);

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Home albums={albums} {...props} />}
          />
          <Route
            path="/collection"
            exact
            render={(props) => <CollectionList albums={albums} {...props} />}
          />
          <Route
            path="/albums"
            exact
            render={(props) => (
              <AlbumList
                albums={albums}
                setAlbums={setAlbums}
                images={images}
                setImages={setImages}
                loading={loading}
                setLoading={setLoading}
                {...props}
              />
            )}
          />
          <Route
            path="/albums/:id"
            exact
            render={(props) => (
              <AlbumView images={images} setImages={setImages} {...props} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
