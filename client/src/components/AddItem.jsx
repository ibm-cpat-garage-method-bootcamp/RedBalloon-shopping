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

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToSave: {},
      name: "",
      size: "",
      comment: "",
      locations: [['','']],
      nameInvalid: null
    };
  }

  componentDidMount() {
    let dataToSave = {
      name: this.state.name,
      size: this.state.size,
      comment: this.state.comment,
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

  saveLocation = (e, idx, field) => {
    const { value } = e.target
    const { locations } = this.state
    if (field === 'STORE') locations[idx][0] = value
    else if (field === 'AISLE') locations[idx][1] = value
    this.setState({
      locations
    })
  }

  checkForm = () => {
    checkFlag = true;
    if (!this.state.name) {
      this.setState({ nameInvalid: true });
      checkFlag = false;
    }
    return checkFlag;
  };

  clearForm = () => this.setState({ 
    name: '',
    size: '',
    comment: '',
    locations: [['', '']]
  });

  saveForm = event => {
    event.preventDefault();
    if (this.checkForm()) {
      this.props.itemManager.addItem({
        name: this.state.name,
        size: this.state.size,
        comment: this.state.comment,
        locations: this.purgeEmptyLocations(this.state.locations)
      })
      this.clearForm()
    }
  };

  addLocation = () => {
    const { locations } = this.state
    locations.push(['', ''])
    this.setState({
      locations
    })
  }

  purgeEmptyLocations = (locations) => locations.filter(
    ([store, aisle]) => (store !== '' && aisle !== '')
  )

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
                {this.state.locations.map((location, i) => (
                    <div 
                    key={`location-${i}`}
                    className="location-row"
                    >
                      <TextInput
                        className="location-input"
                        id={`store-${i}`}
                        name={`store-${i}`}
                        data-testid={`store-${i}`}
                        value={location[0] || ""}
                        onChange={(e) => {
                          e.preventDefault()
                          this.saveLocation(e, i, 'STORE')
                        }}
                        labelText="store"
                        maxLength="100"
                      />            
                      <TextInput
                        className="location-input"
                        id={`aisle-${i}`}
                        name={`aisle-${i}`}
                        data-testid={`aisle-${i}`}
                        value={location[1] || ""}
                        onChange={(e) => {
                          e.preventDefault()
                          this.saveLocation(e, i, 'AISLE')
                        }}
                        labelText="aisle"
                        maxLength="100"
                      />                      
                    </div>
                  ))
                }
                <Button 
                  onClick={this.addLocation}
                  data-testid="addLocation"
                  style={{'backgroundColor': 'darkred'}}
                >Add</Button>
                <br />
                <br />
                <div className="left-align">
                  <Button 
                    onClick={this.saveForm}
                    data-testid="submit"
                    style={{'backgroundColor': 'darkred'}}
                  >Update</Button>
                </div>
              </Form>
            </Tile>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
export default AddItem;
