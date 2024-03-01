import React from "react";
import "./style.css";
import { IDataItem } from "../../store/store";
import Button from "../button";

interface TableRowProps {
  index: number;
  item: IDataItem;
  deleteItem: (index: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, item, deleteItem }) => {
  const keys = Object.keys(item) as Array<keyof IDataItem>;

  return (
    <div className={"row"}>
      {keys.map((key, index) => (
        <div key={index} className={key}>
          {key === "starships"
            ? item[key].length === 0
              ? "Нет информации"
              : item[key].join(", ")
            : item[key]}
        </div>
      ))}
      <Button onClick={() => deleteItem(index)} text={"Удалить строку"} />
    </div>
  );
};

export default TableRow;
