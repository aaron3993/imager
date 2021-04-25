import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import CollectionList from "./Collection/CollectionList";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/collection"
          exact
          render={(props) => <CollectionList {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
