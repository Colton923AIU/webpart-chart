import type {
  TMetricDataMap,
  NiceObject,
  DiffObject,
  MetricParcel,
  TDataPoint,
} from "../../types/LoggerDataTypes";
import DiffLogData from "../../functions/DiffLogData";

export const MetricDataPrep = (data: NiceObject[]) => {
  const MetricDataMap: TMetricDataMap = new Map();

  data.map((val, index) => {
    const dat = {
      t0: val,
      t1: {} as NiceObject,
      diff: {} as DiffObject,
    } as MetricParcel;
    const existing = MetricDataMap.get(val.ID);
    if (existing?.length) {
      if (!isNaN(existing[existing.length - 1].t1.ID)) {
        existing.push(dat);
      } else {
        const newItem = {
          t0: existing[existing.length - 1].t0,
          t1: dat.t0,
          diff: DiffLogData(dat.t0, existing[existing.length - 1].t0),
        };
        existing.pop();
        existing.push(newItem);
      }
      MetricDataMap.set(val.ID, existing);
    } else {
      MetricDataMap.set(val.ID, [dat]);
    }
  });
  return MetricDataMap;
};

const TimeBetweenModified = (mdm: TMetricDataMap) => {
  const points: TDataPoint[] = [];
  mdm.forEach((arr: MetricParcel[], key: number, map: TMetricDataMap) => {
    arr.map((item) => {
      points.push({
        deltaTime: item.diff.Modified_diff,
        startDate: item.t0.Modified,
        endDate: item.t1.Modified,
        LSSAdvisor: item.t1.LSSAdvisorEmail,
      });
    });
  });
  return points;
};

const CleanTimePoints = (points: TDataPoint[]) => {
  return points.reduce((prev: TDataPoint[], curr) => {
    if (
      !isNaN(curr.deltaTime) &&
      curr.deltaTime !== false &&
      curr.deltaTime !== true
    ) {
      prev.push(curr);
    }

    return prev;
  }, []);
};

const StatsOnThis = (points: TDataPoint[]) => {
  const lssAdvisors = points.reduce((prev: string[], curr) => {
    if (!prev.includes(curr.LSSAdvisor)) {
      prev.push(curr.LSSAdvisor);
    }
    return prev;
  }, []);

  const averages = lssAdvisors.map((item) => {
    const average = points.reduce((prev: number[], curr) => {
      if (curr.LSSAdvisor === item) {
        prev.push(Math.ceil((parseInt(curr.deltaTime) / 1000) * -1));
      }
      return prev;
    }, []);
    return {
      [item]: average,
    };
  });
  return averages;
};

const AverageResponse = (data: NiceObject[]) => {
  return StatsOnThis(
    CleanTimePoints(TimeBetweenModified(MetricDataPrep(data)))
  );
};

export default AverageResponse;
