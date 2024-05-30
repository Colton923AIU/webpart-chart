import { NiceObject } from "../types/LoggerDataTypes";

const InitializeLoggerData = (data: string[]) => {
  const CleanData = (data: any) => {
    const tempData = data;
    if (!data.Attachments) {
      tempData.Attachments = false;
    } else {
      if (data.Attachments === "" || data.Attachments === "False") {
        tempData.Attachments = false;
      } else if (data.Attachments === "True" || data.Attachments === "true") {
        tempData.Attachments = true;
      }
    }
    if (!data.AttachmentsCount) {
      tempData.AttachmentsCount = 0;
    }
    return tempData;
  };
  return data
    .map((item) => {
      return JSON.parse(item);
    })
    .map((item) => {
      return CleanData(item);
    })
    .sort((a, b) => {
      if (new Date(a.Modified).getTime() > new Date(b.Modified).getTime()) {
        return -1;
      }
      return 0;
    }) as NiceObject[];
};

export default InitializeLoggerData;
