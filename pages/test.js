import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'athlete',
          width: 200,
          rowSpan: function(params) {
            var athlete = params.data.athlete;
            if (athlete === 'Ryan Lochte') {
              return 4;
            } else {
              return 1;
            }
          },
          cellClassRules: {
            'cell-span': " value === 'Ryan Lochte'"
          }
        },
       
      ],
      defaultColDef: {
        width: 170,
        resizable: true,
      },
      suppressRowTransform: true,
      rowData: [],
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      <>
       <style >{`
                             .cell-span {
  background-color: #00e5ff;
}
`}</style>
      
      <div
        className="ag-theme-balham"
        style={{ height: "800px", width: "100%" }}
      >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            suppressRowTransform={this.state.suppressRowTransform}
            rowData={this.state.rowData}
          />
      </div>
      </>
    );
  }
}



export default App;