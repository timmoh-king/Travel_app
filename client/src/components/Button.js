import React from "react";

const Button = ({ buttonName, onClick, buttonStyle, buttonType }) => {
  return (
    <div>
      <button
        className={`flex-center rounded font-normal text-travelWhite text-base py-1 h-2rem ${buttonStyle ? buttonStyle : ""}`}
        type={buttonType}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
