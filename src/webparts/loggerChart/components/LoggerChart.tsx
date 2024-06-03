import * as React from "react";
import type { ILoggerChartProps } from "./ILoggerChartProps";
import useSharePointListData from "../../../hooks/useSharePointListData/useSharePointListData";
import InitializeLoggerData from "../../../functions/InitializeLoggerData";
// import AverageResponse from "../../../metrics/AverageResponse/AverageResponse";
// import ChartController from "./chart/ChartController/ChartController";
import ChangeListController from "./changelist/ChangeListController/ChangeListController";
import MostRecentChange, {
  IChange,
} from "../../../metrics/MostRecentChange/MostRecentChange";
// import { NiceObject } from "../../../types/LoggerDataTypes";

const LoggerChart: React.FC<ILoggerChartProps> = (props: ILoggerChartProps) => {
  const [listData] = useSharePointListData({
    client: props.spHttpClient,
    absoluteUrl: props.absoluteUrl,
    spListLink: props.spListLink,
  });
  // const [metricOneData, setMetricOneData] = React.useState<
  //   null | { [item: string]: number[] }[]
  // >(null);
  // const [loggerData, setLoggerData] = React.useState<NiceObject[]>();
  const [mostRecentChangeData, setMostRecentChangeData] = React.useState<
    IChange[]
  >([]);

  React.useEffect(() => {
    if (listData === null) return;

    const tempData: string[] = [];
    listData.forEach((row: Record<string, any>) => {
      tempData.push(
        Object.keys(row).reduce((prev: string, curr: string) => {
          if (curr.includes("_og")) {
            if (row[curr] !== null) {
              prev += row[curr];
            }
          }
          return prev;
        }, "")
      );
    });
    const logData = InitializeLoggerData(tempData);

    // setLoggerData(logData);
    // const MetricOne = (listData: any) => {
    //   return AverageResponse(listData);
    // };
    // const metricData = MetricOne(listData);
    const mrcData = MostRecentChange(logData).filter(
      (a) => a.events.length > 0
    );
    setMostRecentChangeData(mrcData);
  }, [listData]);

  return (
    <section>
      {mostRecentChangeData ? (
        <ChangeListController data={mostRecentChangeData} />
      ) : null}
      {/* <div>
        <h2>Dynamic Chart of Logged Data</h2>
        <p>Average Response Time Example Metric</p>
        <p>
          This metric gets the difference in modified values for each items for
          each person
        </p>
        <p>
          Though this isn't interesting in itself, the system of dynamically
          changing charts from List SP Lists is
        </p>
      </div>
      {metricOneData ? <ChartController data={metricOneData} /> : null}
      {metricOneData ? (
        <div
          style={{
            margin: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <span>Here is the data in it's post-processed from:</span>
          {metricOneData.map((item) => {
            return <p style={{ width: "100%" }}>{JSON.stringify(item)}</p>;
          })}
        </div>
      ) : null} */}
    </section>
  );
};

export default LoggerChart;
