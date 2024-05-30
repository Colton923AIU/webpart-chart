import * as React from "react";
import type { AxisBottomProps } from "../AxisBottom/AxisBottom";
import type { AxisLeftProps } from "../AxisLeft/AxisLeft";

export interface BarsProps {
  data: { name: string; value: number }[];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
}
const colorList = ["teal", "black", "red", "green"];

const Bars = ({ data, height, scaleX, scaleY }: BarsProps) => {
  return (
    <>
      {data.map((item, idx) => {
        return (
          <rect
            key={`bar-${item.name}-${item.value}`}
            x={10 + Math.ceil(scaleX.bandwidth() / data.length) * idx}
            y={scaleY(Math.ceil(item.value))}
            width={Math.ceil(scaleX.bandwidth() / data.length)}
            height={Math.ceil(height - scaleY(item.value))}
            fill={colorList[idx % 4]}
          />
        );
      })}
    </>
  );
};

export default Bars;
