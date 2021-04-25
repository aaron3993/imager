import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Collection from "./Collection";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/collection"
          exact
          render={(props) => <Collection {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
