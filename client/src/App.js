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
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      let res = await axios.get("http://localhost:8080/albums");
      setAlbums(res.data);
    }

    getAlbums();
  }, []);

  // async function addToAlbum(image, album) {
  //   try {
  //     await axios.post(`http://localhost:8080/albums/${album._id}`);
  //     console.log("Post request successful");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
            render={(props) => <CollectionList {...props} />}
          />
          <Route
            path="/albums"
            exact
            render={(props) => (
              <AlbumList albums={albums} setAlbums={setAlbums} {...props} />
            )}
          />
          <Route
            path="/albums/:id"
            exact
            render={(props) => <AlbumView {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
