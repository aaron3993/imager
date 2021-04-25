import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import CollectionList from "./Collection/CollectionList";
import AlbumList from "./Albums/AlbumList";

const App = (props) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      let res = await axios.get("http://localhost:8080/albums");
      setAlbums(res.data);
    }

    getAlbums();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/collection"
          exact
          render={(props) => <CollectionList {...props} />}
        />
        <Route
          path="/albums"
          exact
          render={(props) => <AlbumList albums={albums} {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
