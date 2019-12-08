//mostly code from react.js org/docs/error-boundaries.html

import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
      //or just use navigate(./) which comes from reach router
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      //if has any errror run this
      return (
        <h1>
          There was an Error with this listing. <Link to="/"> Click here </Link>
          to go back to the home Page or wait five Seconds
        </h1>
      );
    }
    //if does not have any error pass the component
    return this.props.children;
    //children will be everything inside the Link above
  }
}

export default ErrorBoundary;
