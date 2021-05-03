import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import ImageList from "./ImageList";

const Home = (props) => {
  const { albums } = props;
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const searchImages = async (e, term) => {
    e.preventDefault();
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID HogGshsiM9hbZC7IBAJ1opNRJb9aWwQEoEVrCsxxYq8",
      },
    });
    setImages(response.data.results);
  };

  return (
    <div>
      <Form
        className="mt-3 d-flex flex-column align-items-center"
        onSubmit={(e) => searchImages(e, search)}
      >
        <FormGroup>
          <Input
            type="text"
            placeholder="Search Images"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            Search
          </Button>
        </FormGroup>
      </Form>
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
