import type { NiceObject, DiffObject } from "../types/LoggerDataTypes";

const DiffLogData = (val: NiceObject, compare: NiceObject) => {
  const allKeys = [
    "ID",
    "Created",
    "AuthorEmail",
    "Modified",
    "EditorEmail",
    "ERPID",
    "LearnerName",
    "ProgramValue",
    "AppealStageValue",
    "LSSAdvisorEmail",
    "Attachments",
    "AttachmentsCount",
  ];
  const DiffObjects: any[] = [];

  const diff = (val: any, compare: any) => {
    if (val === compare) {
      return true;
    }
    return false;
  };

  allKeys.forEach((key: keyof NiceObject, index: number) => {
    if (diff(val[key], compare[key])) {
      DiffObjects.push({
        [`${key}_diff`]: false,
      });
      return;
    } else {
      if (key === "Created" || key === "Modified") {
        const diff1 = new Date(val[key]);
        const diff2 = new Date(compare[key]);
        const timeDiff = Math.floor(diff2.getTime() - diff1.getTime());
        const seconds = timeDiff / 1000;

        DiffObjects.push({
          [`${key}_diff`]: seconds,
        });
        return;
      } else {
        DiffObjects.push({
          [`${key}_diff`]: true,
        });
        return;
      }
    }
  });
  return Object.assign({} as DiffObject, ...DiffObjects) as DiffObject;
};

export default DiffLogData;
