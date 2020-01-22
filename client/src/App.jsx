import React, { Component } from "react";
import "./App.scss";

import ItemsForm from './components/ItemsForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ItemsForm />
      </div>
    );
  }
}

export default App;
