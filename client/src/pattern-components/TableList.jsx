import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Icon
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import Header from "./Header";
import "./patterns.scss";

class TableList extends Component {
  title = 'Shopping List';
  //subtitle = 'This pattern will display and array of model objects in a multi column grid/table.';

  columns = ['Name', 'Size', 'Comment'];
  formatters = {
    'ZipCode': function(val) {
      return val + '-0000';
    }
  };

  data = [
    {
      Name: "Corn",
      Size: "Medium",
      Comment: "I love Elote",
      Status: false
    },
    {
      Name: "Chocolate Milk",
      Size: "Large",
      Comment: "",
      Status: false
    },
    {
      Name: "Chicken Breast",
      Size: "10 lbs",
      Comment: "Organic Only",  
      Status: false  
    },
    {
      Name: "Celery",
      Size: "50 oz",
      Comment: "",
      Status: false
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedRow: 0,
    };
  }

  async componentDidMount() {

    this.setState({
      data: this.data,
    })
  }

  doNothing = i => {

  }

  onRowClick = id => {
    if (this.data[id].Status === false){
      this.data[id].Status = true;
    } else {
      this.data[id].Status = false;
    }
    this.setState({ data: this.data });
  };

  renderRow = (row, id) => {
    return (
      <StructuredListRow key={id} onClick={() => this.onRowClick(id)}>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            //defaultChecked={this.state.selectedRow === id}
            checked={row.Status}
          />
          <StructuredListCell>
            <input type="checkbox" checked={row.Status} onChange={this.doNothing}/>
          </StructuredListCell>
        </div>
        {this.columns.map(col => {
          const format = this.formatters[col] || function(val) { return val; };

          return (
            <StructuredListCell key={col} className="simple-list-row">
              {format(row[col])}
            </StructuredListCell>
          );
        })}
      </StructuredListRow>
    );
  };

  render() {
    const data = this.state.data;
    
    var datalength_equals_rows = true;
    return (
      <div className="bx--grid pattern-container">
        <Header
          title={this.title}
          //subtitle={this.subtitle}
        />
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <StructuredListWrapper selection border
            data-testid="input-listwrapper">
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head />
                  {this.columns.map(key => {
                    return (
                      <StructuredListCell head key={key}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </StructuredListCell>
                    );
                  })}
                </StructuredListRow>
              </StructuredListHead>

              <StructuredListBody>
                {data.map((row, i) => {
                  
                  if (i + 1 === data.length){
                    datalength_equals_rows = true;
                  } else {
                    datalength_equals_rows = false;
                  }
                  return this.renderRow(row, i);
                })}
                
                <div data-testid="test-row-count" value={datalength_equals_rows} ></div>
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default TableList;
