import React from "react";
import "./style.css"
import { IDataItem } from "../../store/store";

interface TableHeadProps {
  item: IDataItem;
  sort: (index: keyof IDataItem) => void;
}

const TableHead: React.FC<TableHeadProps> = ({ item, sort }) => {
  const keys = Object.keys(item) as Array<keyof IDataItem>;

  return (
    <div className={"title"}>
      {keys.map((key, index) => {
        return (
          <div key={index} className={key} onClick={() => sort(key as keyof IDataItem)}>
            {key === "starships"
              ? (item[key] as string[]).join(", ")
              : item[key]}
          </div>
        );
      })}
    </div>
  );
};

export default TableHead;
