import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  //we can set correct context for "this" in this way
  //   constructor(props) {
  //     super(props);

  //     this.handleIndexClick = this.handleIndexClick.bind(this);
  //   }

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handleIndexClick = event => {
    //we use arrow fn here so that fn does not set its own context for "this"
    this.setState({
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              src={photo}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
