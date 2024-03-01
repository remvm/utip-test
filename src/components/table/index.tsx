import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import dataStore, { IDataItem } from "../../store/store";
import Modal from "../modal/index";
import "./style.css"
import TableRow from "../table-row";
import TableHead from "../table-head";
import Loader from "../loader";
import Pagination from "../pagination";
import ControlBar from "../control-bar";

const columns: IDataItem = {
  name: "Имя",
  gender: "Пол",
  birth_year: "Дата рождения",
  homeworld: "Родная планета",
  starships: ["Корабли"],
};

interface TableProps {}

const Table: React.FC<TableProps> = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleDeleteItem = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dataStore.deleteItem(selectedIndex);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleSortData = (column: keyof IDataItem) => {
    dataStore.sortData(column);
  };

  const isDataLoaded = dataStore.data.length > 0
  const isDataExists = !(dataStore.data.length === 0 && !dataStore.loading)

  return (
    <div className={"table-wrapper"}>
      <ControlBar />
      {isDataExists ? (
        dataStore.loading ? (
          <Loader />
        ) : (
          <div className={"table"}>
            {dataStore.error && <p>{dataStore.error}</p>}
            <TableHead item={columns} sort={handleSortData}/>
            {!dataStore.loading && !dataStore.error &&
              dataStore.data.map((item: IDataItem, index: number) => (
                <TableRow key={index} index={index} item={item} deleteItem={() => handleDeleteItem(index)}/>
              ))
            }
            {showModal && (
              <Modal
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={"Вы действительно хотите удалить строку?"}
              />
            )}
          </div>
        )
      ) : (
        <div className={"not-loaded"}>Данные не загружены</div>
      )}
      {isDataLoaded && (
        <Pagination pageSize={10} />
      )}
    </div>
  );
});

export default Table;
