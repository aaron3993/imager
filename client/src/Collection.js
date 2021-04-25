import React, { useState, useEffect } from "react";
import axios from "axios";

const Collection = (props) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function getImages() {
      let res = await axios.get("http://localhost:8080/images");
      //   res = await res.json();
      console.log(res);
      setCollection(res.data);
    }

    getImages();
  }, []);

  //   useEffect(() => {
  //     axios.get("/images").then((res) => {
  //       console.log(res);
  //     });
  //   }, []);

  const collectionList = collection.map((image) => {
    return (
      <li key={image._id}>
        <img src={image.url} alt={image.alt_description} />
      </li>
    );
  });
  return (
    <div>
      <div>{collectionList}</div>
    </div>
  );
};

export default Collection;
