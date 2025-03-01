import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Content from "./Content";
import Header from "../reusable/Header";

const App = () => {
  const HideHeaderWrapper = () => {
    const location = useLocation();
    const hideHeader =
      location.pathname === "/login" || location.pathname === "/register";

    return !hideHeader && <Header />;
  };

  return (
    <Router>
      <div className="app h-screen">
        <HideHeaderWrapper />
        <Content />
      </div>
    </Router>
  );
};

export default App;
