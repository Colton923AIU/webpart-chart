import * as React from "react";
import { IChange } from "../../../../../metrics/MostRecentChange/MostRecentChange";
import styles from "../ChangeListController/ChangeListController.module.scss";
import { Text } from "@fluentui/react";
export type TRow = {
  rowItem: IChange;
};

const Row = ({ rowItem }: TRow) => {
  const date = new Date(rowItem.eventDate);
  const m = date.getMonth().toString();
  const d = date.getDay().toString();
  const y = date.getFullYear().toString();

  const ho = date.getHours();
  const mi = date.getMinutes();

  const h = ho > 12 ? `${ho - 12}:${mi} pm` : `${ho}:${mi} am`;
  const x = `${h} ${m}/${d}/${y.slice(0, 2)}`;

  return (
    <>
      <Text variant={"xSmall"}> {x}</Text>
      <Text variant={"small"}>
        {rowItem.eventEditor ? rowItem.eventEditor.split("@")[0] : "Editor N/A"}
      </Text>
      <div className={styles["row-events-wrapper"]}>
        {rowItem.events.map((event, index) => {
          return (
            <div className={styles["row-event"]} key={`row-event_${index}`}>
              <Text variant={"small"}> {event}</Text>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Row;
