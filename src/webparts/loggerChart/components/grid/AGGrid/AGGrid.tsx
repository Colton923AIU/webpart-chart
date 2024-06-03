import * as React from "react";

import { AgGridReact } from "ag-grid-react";

import type { AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridEvent } from "ag-grid-community";

interface IAGGrid {
  ColDefs: AgGridReactProps["columnDefs"];
  RowData: any;
}

const AGGrid = ({ ColDefs, RowData }: IAGGrid) => {
  const gridApi = React.useRef<any>(null);

  const onGridReady = (params: AgGridEvent) => {
    gridApi.current = params.api;
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={RowData}
        columnDefs={ColDefs}
        onGridReady={onGridReady}
        ref={gridApi}
      />
    </div>
  );
};
export default AGGrid;
