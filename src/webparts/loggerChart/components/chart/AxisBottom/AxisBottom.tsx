import * as React from "react";
import { type ScaleBand, select, axisBottom } from "d3";

export interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};

export default AxisBottom;
