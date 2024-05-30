export interface NiceObject {
  ID: number;
  Created: Date;
  AuthorEmail: string;
  Modified: Date;
  EditorEmail: string;
  ERPID: number;
  LearnerName: string;
  ProgramValue: string;
  AppealStageValue: string;
  LSSAdvisorEmail: string;
  Attachments: boolean;
  AttachmentsCount: number;
}

export interface DiffObject {
  ID_diff: false | number;
  Created_diff: number; // date.getTime() diff
  AuthorEmail_diff: false | string;
  Modified_diff: number; // date.getTime() diff
  EditorEmail_diff: false | string;
  ERPID_diff: false | number;
  LearnerName_diff: false | string;
  ProgramValue_diff: false | string;
  AppealStageValue_diff: false | string;
  LSSAdvisorEmail_diff: false | string;
  Attachments_diff: boolean;
  AttachmentsCount_diff: false | number;
}

export type MetricParcel = {
  t0: NiceObject;
  t1: NiceObject;
  diff: DiffObject;
};
export type TMetricDataMap = Map<number, MetricParcel[]>;

export type TDataPoint = {
  deltaTime: any;
  startDate: any;
  endDate: any;
  LSSAdvisor: any;
};
