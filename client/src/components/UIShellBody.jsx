import React, { Component } from "react";
import AddItem from "./AddItem";
import { ItemManager } from "./ItemManager"
import SimpleList from "../pattern-components/SimpleList";
import TableList from "../pattern-components/TableList";
import "../pattern-components/patterns.scss";

class UIShellBody extends Component {
  components = {
    "Add Item": AddItem,
    "Simple List": SimpleList,
    "Basic Page": TableList
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
