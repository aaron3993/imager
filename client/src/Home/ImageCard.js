import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, FormFeedback } from "reactstrap";
import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "./ImageCard.css";

const ImageCard = (props) => {
  const { image, albums } = props;
  const [option, setOption] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [validMsg, setValidMsg] = useState("");
  const [invalidMsg, setInvalidMsg] = useState("");

  useEffect(() => {
    setSelectedAlbum(albums.find((album) => album.title === option));
  }, [option]);

  async function addToCollection() {
    try {
      await axios.post("http://localhost:8080/images/collection", image);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(option);
  async function addToAlbum(image) {
    try {
      const res = await axios.post("http://localhost:8080/images/album", {
        album: selectedAlbum,
        image: image,
      });
      setTimeout(() => {
        if (res.data.message) {
          setIsInvalid(true);
          setInvalidMsg(res.data.message);
        }
      }, 500);
      console.log(res.data.message);
      console.log(isInvalid);
    } catch (err) {
      console.log(err);
    }
  }

  const options = albums.map((album) => {
    return <option>{album.title}</option>;
  });

  return (
    <div className="image-card">
      <div className="card-image">
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
      {/* <div className="form"> */}
      {/* <Select
        className="w-75"
        options={options}
        value={option}
        onChange={setOption}
        placeholder="Select an album"
        valid={isValid}
        invalid={isInvalid}
      /> */}
      <Input
        type="select"
        name="select"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Select an album"
      >
        {options}
      </Input>
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => addToAlbum(image.urls.regular, option)}
      >
        Add to Album
      </Button>
      {/* <span className="p-0 m-0">Please select an album</span> */}
      {isValid ? (
        <FormFeedback valid>{validMsg}</FormFeedback>
      ) : (
        <FormFeedback inValid={isInvalid}>{invalidMsg}</FormFeedback>
      )}
      {/* <button onClick={() => addToAlbum(image.urls.regular, option.value)}>
        Add to Album
      </button> */}
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => addToCollection()}
      >
        Save to Collection
      </Button>
      <span>Please select an album</span>
      {/* <button onClick={() => addToCollection()}>Save to Collection</button> */}
      {/* </div> */}
    </div>
  );
};

export default ImageCard;
