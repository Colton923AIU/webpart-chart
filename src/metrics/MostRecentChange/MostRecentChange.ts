import { MetricDataPrep } from "../AverageResponse/AverageResponse";
import type {
  DiffObject,
  NiceObject,
  TMetricDataMap,
} from "../../types/LoggerDataTypes";

export interface IChange {
  eventDate: DiffObject["Modified_diff"];
  eventEditor: DiffObject["EditorEmail_diff"];
  events: string[];
}

const MostRecentChange = (metricData: NiceObject[]) => {
  const data: TMetricDataMap = MetricDataPrep(metricData);
  const GetChanges = (CData: TMetricDataMap) => {
    const GetEvents = (item: DiffObject) => {
      const changes: string[] = [];
      if (item.Attachments_diff === true) {
        changes.push("First Attachment Added");
      } else {
        if (item.AttachmentsCount_diff) {
          changes.push("New Attachment Added");
        }
      }
      if (item.AppealStageValue_diff) {
        changes.push(`Stage Changed to: ${item.AppealStageValue_diff}`);
      }
      if (item.AuthorEmail_diff) {
        changes.push(`Author's Email: ${item.AuthorEmail_diff}`);
      }
      if (item.Created_diff) {
        changes.push(`Created at: ${item.Created_diff}`);
      }
      if (item.ERPID_diff) {
        changes.push(`ERPID Changed to: ${item.ERPID_diff}`);
      }
      if (item.EditorEmail_diff) {
        changes.push(`Editor Email: ${item.EditorEmail_diff}`);
      }
      if (item.ID_diff) {
        changes.push(`ID: ${item.ID_diff}`);
      }
      if (item.LSSAdvisorEmail_diff) {
        changes.push(
          `LSS Advisor Email Changed to: ${item.LSSAdvisorEmail_diff}`
        );
      }
      if (item.LearnerName_diff) {
        changes.push(`Learner Name: ${item.LearnerName_diff}`);
      }
      if (item.ProgramValue_diff) {
        changes.push(`Program Value Changed to: ${item.ProgramValue_diff}`);
      }
      return changes;
    };
    const changes: IChange[] = [];
    CData.forEach((item) => {
      item.forEach((piece) => {
        const EventChanges = GetEvents(piece.diff);
        const newItem: IChange = {
          eventDate: !isNaN(new Date(piece.t1.Modified).getTime())
            ? new Date(piece.t1.Modified).getTime()
            : new Date(piece.t0.Modified).getTime(),
          eventEditor: piece.t1.EditorEmail
            ? piece.t1.EditorEmail
            : piece.t0.EditorEmail,
          events: EventChanges,
        };
        changes.push(newItem);
      });
    });
    return changes;
  };

  const SortChanges = (data: IChange[]) => {
    return data.sort((a, b) => a.eventDate - b.eventDate);
  };

  return SortChanges(GetChanges(data));
};

export default MostRecentChange;
