import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  render() {
    const { photos, actiev } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
      </div>
    );
  }
}

export default Carousel;
