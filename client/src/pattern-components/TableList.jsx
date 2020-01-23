import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Dropdown,
  DropdownItem,

} from "carbon-components-react";
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
      Status: true
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedRow: 0,
      filter: ""
    };
  }

  async componentDidMount() {

    this.setState({
      data: this.data,
    })
  }

  doNothing = i => {

  }

  filterTable = i => {
    if (i.value === "true"){
      var data2 = this.data.filter(this.filterData);
      this.setState({ data: data2, filter: i.value });
    }else {
      this.setState({ data: this.data, filter: i.value });
    }
  }

  filterData = listdata => {
    console.log(listdata);
    if (listdata.Status === true){
      return listdata;
    }
  }

  onRowClick = row => {
    for (var i = 0; i < this.data.length; i++){
      if (this.data[i].Name === row.Name){
        if (this.data[i].Status === true){
          this.data[i].Status = false;
        } else {
          this.data[i].Status = true;
        }
      }
    }
    //this.setState({ data: this.state.data });
    this.onRowClickFilter(this.state.filter);
  };

  onRowClickFilter = filter => {
    if (filter === "true"){
      var data2 = this.data.filter(this.filterData);
      this.setState({ data: data2, filter: filter });
    }else {
      this.setState({ data: this.state.data, filter: filter });
    }
  }

  renderRow = (row, id) => {
    return (
      <StructuredListRow key={id} onClick={() => this.onRowClick(row)}>
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
          <div>
          <Dropdown
            ariaLabel="dropdown menu label"
            defaultText="Filter By:"
            onChange={this.filterTable}>
            
            <DropdownItem itemText="Needed" value="true" />
            <DropdownItem itemText="None" value="false" />
          </Dropdown>
        </div>
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
