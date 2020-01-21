import React, { Component } from "react";
import Header from "./Header";
import "./patterns.scss";

class BasicPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bx--grid pattern-container">
        <Header title="Basic Page" subtitle="A basic boilerplate page." />
      </div>
    );
  }
}

export default BasicPage;
