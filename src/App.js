import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParam";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

export const App = () => {
  const themeHook = useState("peru");
  console.log(themeHook[0]);
  //OR
  // const themeHook = useState({
  //   buttonLight: "peru",
  //   buttonDark: "lightblue"
  // });

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
