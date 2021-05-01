import React, { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import axios from "axios";

import ImageList from "./ImageList";

const Home = (props) => {
  const { albums } = props;
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className="mt-3 d-flex flex-column align-items-center">
      <FormGroup>
        <Input
          type="text"
          placeholder="Search Images"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button
          color="primary"
          type="submit"
          onClick={() => searchImages(search)}
        >
          Search
        </Button>
      </FormGroup>
      {/* {!images.length ? (
        <Welcome />
      ) : (
        <ImageList images={images} albums={albums} />
      )} */}
      <ImageList images={images} albums={albums} />
    </div>
  );
};

export default Home;
