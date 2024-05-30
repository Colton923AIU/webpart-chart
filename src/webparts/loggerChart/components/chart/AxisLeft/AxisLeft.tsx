import * as React from "react";
import { type ScaleLinear, select, axisLeft } from "d3";

export interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

const AxisLeft = ({ scale }: AxisLeftProps) => {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const axis = axisLeft(scale)
        .ticks(3)
        .tickFormat((val) => {
          return val + "s";
        });
      select(ref.current).call(axis);
    }
  }, [scale]);

  return <g ref={ref} />;
};

export default AxisLeft;
