import React from "react";
import dataStore from "../../store/store";
import Button from "../button";
import "./style.css";

const ControlBar: React.FC = () => {
  const handleFetchData = (page: number) => {
    dataStore.fetchData(page);
  };

  const handleClearData = () => {
    dataStore.clearData();
  };

  return (
    <div className={"control-bar"}>
      <Button onClick={() => handleFetchData(dataStore.currentPage)} text={"Получить данные"} />
      <Button onClick={handleClearData} text={"Очистить таблицу"} />       
    </div>
  );
};

export default ControlBar;
