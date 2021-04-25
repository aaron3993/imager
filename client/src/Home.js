import React, { useState } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

const Home = (props) => {
  const [images, setImages] = useState([]);

  const searchImages = async (term) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID HogGshsiM9hbZC7IBAJ1opNRJb9aWwQEoEVrCsxxYq8",
      },
    });
    console.log(response);
    setImages(response.data.results);
  };
  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      <ImageList images={images} />
    </div>
  );
};

export default Home;