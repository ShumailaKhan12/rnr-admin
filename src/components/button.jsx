import React from "react";

const Button = ({ btn_title, btn_class, onClick, disabled, icon }) => {
  return (
    <>
      <button
        type="submit"
        className={`py-2 font-14 montserrat-medium rounded-pill ${btn_class}`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && <span className="me-2">{icon}</span>}
        {btn_title}
      </button>
    </>
  );
};

export default Button;
