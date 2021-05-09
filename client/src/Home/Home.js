import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import ImageList from "./ImageList";
import Welcome from "./Welcome";
import "./Home.css";

const Home = (props) => {
  const { albums } = props;
  const [images, setImages] = useState(
    localStorage.getItem("images")
      ? JSON.parse(localStorage.getItem("images"))
      : []
  );
  const [search, setSearch] = useState(
    localStorage.getItem("search") ? localStorage.getItem("search") : ""
  );

  const searchImages = async (e, term) => {
    e.preventDefault();
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID HogGshsiM9hbZC7IBAJ1opNRJb9aWwQEoEVrCsxxYq8",
      },
    });
    setImages(response.data.results);
    localStorage.setItem("images", JSON.stringify(response.data.results));
  };

  const searchText = (e) => {
    setSearch(e.target.value);
    localStorage.setItem("search", e.target.value);
  };

  return (
    <div>
      <Form className="heading" onSubmit={(e) => searchImages(e, search)}>
        <h1 className="mt-3 text-center">Imager</h1>
        <FormGroup>
          <Input
            autoFocus={true}
            type="text"
            placeholder="Search Images"
            value={search}
            onChange={(e) => searchText(e)}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            Search
          </Button>
        </FormGroup>
      </Form>
      <div className="d-flex justify-content-center align-items-center">
        {!images.length ? (
          <Welcome />
        ) : (
          <ImageList images={images} albums={albums} />
        )}
      </div>
    </div>
  );
};

export default Home;
