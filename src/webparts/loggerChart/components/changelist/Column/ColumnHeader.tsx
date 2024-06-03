import * as React from "react";
import styles from "../ChangeListController/ChangeListController.module.scss";
import { Text } from "@fluentui/react";

export type TColumnHeaderProps = {
  header: string;
};

const ColumnHeader = ({ header }: TColumnHeaderProps) => {
  return (
    <div className={styles["header-wrapper"]}>
      <Text variant={"medium"}>{header}</Text>
    </div>
  );
};

export default ColumnHeader;
