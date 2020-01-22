import React, { Component } from "react";
import {
  TextInput,
  Form,
  Button,
  Tile
} from "carbon-components-react";
import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";

let checkFlag = true;

class ItemsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToSave: {},
      name: "",
      size: "",
      comment: ""
    };
  }

  componentDidMount() {
    let dataToSave = {
      name: this.state.name,
      size: this.state.size,
      comment: this.state.comment
    };
    this.setState({ dataToSave });
  }

  saveData = event => {
    const target = event.target;
    let fieldName = target.name;
    let fieldValue = target.value;
    if (!fieldValue) {
      this.setState({ [fieldName]: fieldValue, [fieldName + "Invalid"]: true });
    } else {
      this.setState({
        [fieldName]: fieldValue,
        [fieldName + "Invalid"]: false
      });
    }
  };

  checkForm = () => {
    checkFlag = true;
    if (!this.state.name) {
      this.setState({ nameInvalid: true });
      checkFlag = false;
    }
    return checkFlag;
  };

  saveForm = event => {
    event.preventDefault();
    if (this.checkForm()) {
      let dataToSave = {
        name: this.state.name,
        size: this.state.size,
        comment: this.state.comment
      };
      this.setState({ 
        dataToSave,
        name: '',
        size: '',
        comment: ''
      });
    }
  };

  render() {
    return (
      <div className="bx--grid pattern-container">
        <Header
          title="Update Form"
          subtitle="Update form is based on the Display
            Form pattern but will display model data and then validate ready for
            it to be updated."
        />
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <Tile>
              <Form>
                <TextInput
                  id="name"
                  name="name"
                  data-testid="name"
                  value={this.state.name || ""}
                  onChange={this.saveData}
                  labelText="name"
                  maxLength="100"
                  invalid={this.state.nameInvalid}
                  invalidText="Please enter a name.."
                />
                <br />
                <br />
                <TextInput
                  id="size"
                  name="size"
                  data-testid="size"
                  value={this.state.size || ""}
                  onChange={this.saveData}
                  labelText="size"
                  maxLength="100"
                />
                <br />
                <br />
                <TextInput
                  id="comment"
                  name="comment"
                  data-testid="comment"
                  value={this.state.comment || ""}
                  onChange={this.saveData}
                  labelText="comment"
                  maxLength="100"
                />
                <br />
                <br />
                <div className="left-align">
                  <Button 
                    onClick={this.saveForm}
                    data-testid="submit"
                  >Update</Button>
                </div>
              </Form>
            </Tile>
          </div>
        </div>
        <br />
        <br />
        {Object.keys(this.state.dataToSave).length > 0 && (
          <div className="bx--row">
            <div className="bx--col-xs-12 left-align">
              <Tile>
                {Object.keys(this.state.dataToSave).map(item => (
                  <p key={item}>
                    &nbsp;&nbsp;
                    <strong>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1).replace(/([A-Z])/g, " $1")}
                      :
                    </strong>{" "}
                    {this.state.dataToSave[item]}
                  </p>
                ))}
              </Tile>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ItemsForm;
