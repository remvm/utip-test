import React from "react";
import "./style.css"
import Button from "../button";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel, text }) => {
  return (
    <div className={"modal-background"}>
      <div className={"modal-wrapper"}>
        <div className={"modal"}>
          <div>{text}</div>
          <div className={"confirm-bar"}>
            <Button onClick={onConfirm} text={"Подтвердить"} />
            <Button onClick={onCancel} text={"Отменить"} />
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Modal;
