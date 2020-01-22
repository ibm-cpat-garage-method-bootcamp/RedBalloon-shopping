import React, { Component } from "react";
import AddItem from "./AddItem";
import { ItemManager } from "./ItemManager"
import "../pattern-components/patterns.scss";

class UIShellBody extends Component {
  components = {
    "Add Item": AddItem,
  };
  defaultComponent = "Add Item";

  constructor() {
    super()
    this.state = {
      itemManager: new ItemManager()
    }
  }

  render() {
    let curScreen = this.defaultComponent;
    const PatternName = this.components[curScreen];
    return (
      <div className="pattern-container">
        <PatternName 
          itemManager={this.state.itemManager}
          showDescription={true}
        />
      </div>
    );
  }
}
export default UIShellBody;
