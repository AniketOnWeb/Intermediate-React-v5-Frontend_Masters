import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modals from "./Modals";
import { navigate } from "@reach/router";

class Details extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: true };
  // }

  //new way of using state
  state = { loading: true, showModal: false };

  componentDidMount() {
    // throw new Error("lol");
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          //this will have correct context
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      //this will have correct context
      return <h1>Loading...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal,
      url
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {showModal ? (
            <Modals>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, I am a Monster</button>
                </div>
              </div>
            </Modals>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
// export default function DetailsWithErrorBoundary(props) {
//   return (
//     <ErrorBoundary>
//       <Details {...props} />
//       {/* same as "id = props.id" */}
//     </ErrorBoundary>
//   );
// }
