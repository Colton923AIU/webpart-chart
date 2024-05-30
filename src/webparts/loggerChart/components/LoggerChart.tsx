import * as React from "react";
import styles from "./LoggerChart.module.scss";
import type { ILoggerChartProps } from "./ILoggerChartProps";
import useSharePointListData from "../../../hooks/useSharePointListData/useSharePointListData";
import InitializeLoggerData from "../../../functions/InitializeLoggerData";
import AverageResponse from "../../../metrics/AverageResponse/AverageResponse";
import ChartController from "./chart/ChartController.tsx/ChartController";

const LoggerChart: React.FC<ILoggerChartProps> = (props: ILoggerChartProps) => {
  const [listData] = useSharePointListData({
    client: props.spHttpClient,
    absoluteUrl: props.absoluteUrl,
    spListLink: props.spListLink,
  });
  const [metricOneData, setMetricOneData] = React.useState<
    null | { [item: string]: number[] }[]
  >(null);

  React.useEffect(() => {
    if (listData === null) return;
    const MetricOne = (listData: any) => {
      return AverageResponse(
        InitializeLoggerData(
          listData.value.map((row: Record<string, any>) => {
            return Object.keys(row).reduce((prev: string, curr: string) => {
              if (curr.includes("_og")) {
                if (row[curr] !== null) {
                  prev += row[curr];
                }
              }
              return prev;
            }, "");
          })
        )
      );
    };
    const metricData = MetricOne(listData);
    setMetricOneData(metricData);
  }, [listData]);

  return (
    <section className={`${styles.loggerChart}`}>
      <div>
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
      ) : null}
    </section>
  );
};

export default LoggerChart;
