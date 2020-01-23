import React, { Component } from "react";
import AddItem from "./AddItem";
import { ItemManager } from "./ItemManager"
import TableList from "./TableList";
import "../pattern-components/patterns.scss";

class UIShellBody extends Component {
  components = {
    "Add Item": AddItem,
    "List Items": TableList
  };

  constructor(props) {
    super(props)
    this.state = {
      itemManager: new ItemManager()
    }
  }

  render() {
    const PatternName = this.components[this.props.patternName];

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
