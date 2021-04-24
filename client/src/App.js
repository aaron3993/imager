import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
