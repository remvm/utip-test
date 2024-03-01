import React from "react";
import { observer } from "mobx-react-lite";
import dataStore from "../../store/store";
import Button from "../button";
import "./style.css";

interface PaginationProps {
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = observer(({ pageSize }) => {
  const totalPages = Math.ceil(dataStore.totalItems / pageSize);
  const currentPage = dataStore.currentPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dataStore.setCurrentPage(currentPage - 1);
      dataStore.fetchData(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dataStore.setCurrentPage(currentPage + 1);
      dataStore.fetchData(currentPage + 1);
    }
  };

  return (
    <div className={"pagination-wrapper"}>
      <div className={"pagination"}>
        {currentPage > 1 && (
          <Button onClick={handlePrevPage} text={"Пред. стр."} />
        )}
        <span>{`${currentPage} из ${totalPages}`}</span>
        {currentPage < totalPages && (
          <Button onClick={handleNextPage} text={"След. стр."} />
        )}
      </div>
    </div>
  );
});

export default Pagination;
