import * as React from "react";
import { scaleBand, scaleLinear } from "d3";
import AxisBottom from "../AxisBottom/AxisBottom";
import AxisLeft from "../AxisLeft/AxisLeft";
import Bars from "../Bars/Bars";

interface IChartController {
  data: { [item: string]: number[] }[];
}

const margin = { top: 50, right: 0, bottom: 20, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const ChartController = ({ data }: IChartController) => {
  const names = data.flatMap((item) => {
    return Object.keys(item).flatMap((key) => {
      return key;
    });
  });
  const dataPoints = data.flatMap((item) => {
    return Object.keys(item).flatMap((key) => {
      return item[key];
    });
  });
  const maxY = Math.max(...dataPoints);
  const scaleX = scaleBand().domain(names).range([0, width]).padding(0.5);
  const scaleY = scaleLinear().domain([0, maxY]).range([height, 0]);

  const BarChartData: { name: string; value: number }[] = data.flatMap(
    (item) => {
      return Object.keys(item).flatMap((key) => {
        return item[key].flatMap((numValue: number) => {
          return {
            name: key,
            value: numValue,
          };
        });
      });
    }
  );

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        <Bars
          data={BarChartData}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      </g>
    </svg>
  );
};

export default ChartController;
