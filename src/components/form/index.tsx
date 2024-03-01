import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import dataStore from "../../store/store";
import Input from "../input";
import "./style.css";
import Button from "../button";

const AddRowForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [homeworld, setHomeworld] = useState("");
  const [starships, setStarships] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (key) {
      case "name":
        setName(event.target.value);
        break;
      case "birthYear":
        setBirthYear(event.target.value);
        break;
      case "gender":
        setGender(event.target.value);
        break;
      case "homeworld":
        setHomeworld(event.target.value);
        break;
    }
  };

  const handleStarshipsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setStarships(value.split(","));
  };

  const validateForm = () => {
    setIsFormValid(
      name !== "" &&
        gender !== "" &&
        birthYear !== "" &&
        homeworld !== "" &&
        starships.length > 0
    );
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, gender, birthYear, homeworld, starships]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRow = {
      name,
      gender,
      birth_year: birthYear,
      homeworld,
      starships,
    };

    dataStore.addRow(newRow);
    navigate("/");
  };

  return (
    <div className={"form-wrapper"}>
      <form className={"form"} onSubmit={handleSubmit}>
        <Input
          label="Имя:"
          id="name"
          value={name}
          onChange={(event) => handleInputChange("name", event)}
        />
        <Input
          label="Пол:"
          id="gender"
          value={gender}
          onChange={(event) => handleInputChange("gender", event)}
        />
        <Input
          label="Год рождения:"
          id="birthYear"
          value={birthYear}
          onChange={(event) => handleInputChange("birthYear", event)}
        />
        <Input
          label="Планета:"
          id="homeworld"
          value={homeworld}
          onChange={(event) => handleInputChange("homeworld", event)}
        />
        <Input
          label="Корабли:"
          id="starships"
          value={starships.join(",")}
          onChange={handleStarshipsChange}
        />
        <Button onClick={() => handleSubmit} disabled={!isFormValid} text={"Добавить"} />
      </form>
    </div>
  );
});

export default AddRowForm;
