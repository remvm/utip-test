import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const Header: React.FC = () => {
  
  return (
    <nav className={"navigation"}>
      <ul className={"navigation-list"}>
        <li className={"navigation-list-item"}>
          <Link to="/">Главная</Link>
        </li>
        <li className={"navigation-list-item"}>
          <Link to="/add">Добавить строку</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
