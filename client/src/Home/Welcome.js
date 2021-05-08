import React from "react";

import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-card mt-4 text-center">
      <div className="welcome-container p-3 bg-dark text-light">
        <h1>Welcome to Imager!</h1>
        <p>
          Search for images and save them to your collection or add them to your
          album. Images added to an album will be automatically saved to your
          collection, and removing images from your collection will also remove
          them from your albums. You can also click on an image to preview it in
          a larger resolution, or alternatively, right-click it and navigate to
          its full URL in a new tab.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
