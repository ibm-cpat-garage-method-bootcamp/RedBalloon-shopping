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
  Search,
  SearchSkeleton,
  SearchFilterButton,
  SearchLayoutButton,
} 
from "carbon-components-react";

import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";

class TableList extends Component {
  title = 'Shopping List';
  //subtitle = 'This pattern will display and array of model objects in a multi column grid/table.';

  columns = ['name', 'size', 'comment', 'locations'];


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedRow: 0,
    };
    this.data = [];
  }

  async componentDidMount() {
    this.setState({
      data: Object.values(this.props.itemManager.getItems()),
    })
    this.data = Object.values(this.props.itemManager.getItems());
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
    if (listdata.status === true){
      return listdata;
    }
  }

  onRowClick = row => {
    for (var i = 0; i < this.data.length; i++){
      if (this.data[i].name === row.name){
        if (this.data[i].status === true){
          this.data[i].status = false;
        } else {
          this.data[i].status = true;
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

  searchFilter = filter => {
    console.log(filter);
  }

  renderRow = (row, id) => {
    return (
      <StructuredListRow key={id}>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            //defaultChecked={this.state.selectedRow === id}
            checked={row.status}
          />
          <StructuredListCell>
            <input type="checkbox" checked={row.status} onClick={() => this.onRowClick(row)} data-testid="check"/>
          </StructuredListCell>
        </div>
        {this.columns.map(col => {
          return (
            <StructuredListCell key={col} className="simple-list-row">
              {
              row[col]
              }
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
        
          <Search
          placeHolderText="Search Location"
          labelText="yo"
          onChange={this.searchFilter}>
          
          </Search>
       
          
          <div className="bx--col-xs-12">  

          <div>
          <Dropdown
            ariaLabel="dropdown menu label"
            defaultText="Filter By:"
            onChange={this.filterTable}
            data-testid="dropdown">
            
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

                  var location = "";
                  
                  for (var j = 0; j < row.locations.length; j++){
                    if (row.locations[j][1] !== undefined){
                    location += row.locations[j][0] + ": " + row.locations[j][1] + "\r\n";
                    } else{
                      location = row.locations;
                    }
                  }
                  console.log(location);
                  row.locations = location;
                  
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
