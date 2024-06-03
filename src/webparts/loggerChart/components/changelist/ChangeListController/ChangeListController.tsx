import * as React from "react";
import styles from "./ChangeListController.module.scss";
// import ColumnHeader from "../Column/ColumnHeader";
// import Row from "../Row/Row";
import type { IChange } from "../../../../../metrics/MostRecentChange/MostRecentChange";
import AGGrid from "../../grid/AGGrid/AGGrid";
import { AgGridReactProps } from "ag-grid-react";
import { ValueFormatterFunc } from "ag-grid-community";
interface IChartController {
  data: IChange[];
}

const ChangeListController = ({ data }: IChartController) => {
  const eventsDateFormatter: ValueFormatterFunc<any, any> = (params) => {
    const { data } = params;
    const date = new Date(data.eventDate as any) as Date;
    const m = date.getMonth().toString();
    const d = date.getDay().toString();
    const y = date.getFullYear().toString();

    const ho = date.getHours();
    const mi = date.getMinutes();

    const h = ho > 12 ? `${ho - 12}:${mi} pm` : `${ho}:${mi} am`;
    const x = `${h} ${m}/${d}/${y.slice(0, 2)}`;
    return x;
  };
  const eventsEditorFormatter: ValueFormatterFunc<any, any> = (params) => {
    const { data } = params;
    if (data.eventEditor) {
      return data.eventEditor.split("@")[0];
    } else {
      return "Editor N/A";
    }
  };
  const colDefs: AgGridReactProps["columnDefs"] = [
    { field: "eventsDate", valueFormatter: eventsDateFormatter, filter: true },
    {
      field: "eventsEditor",
      valueFormatter: eventsEditorFormatter,
      filter: true,
    },
    {
      field: "events",
      filter: true,
    },
  ];

  return (
    <div className={styles["controller-wrapper"]}>
      <AGGrid ColDefs={colDefs} RowData={data} />
      {/* <div className={styles["controller-columns-wrapper"]}>
        <ColumnHeader header={"Date"} />
        <ColumnHeader header={"Editor"} />
        <ColumnHeader header={"Events"} />
      </div>
      <div className={styles["controller-item-wrapper"]}>
        {data.length > 0
          ? data.map((item, index) => {
              return (
                <div
                  className={styles["controller-rows-wrapper"]}
                  key={`controller-item_${index}`}
                >
                  <Row rowItem={item} />
                </div>
              );
            })
          : null}
      </div> */}
    </div>
  );
};

export default ChangeListController;
