import React from 'react';

const Input = ({
  index,
  labelName,
  placeHolder,
  isRequired,
  inputType,
  inputValue,
  inputName,
  inputStyle,
  onChange,
  error
}) => {
  return (
      <div className="bg-travelWhite border-travelBlue rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-travelBlue">
          <label className="block text-travelBlue text-normal py-2 px-2 font-semibold">
              {labelName}
          </label>
          <input
              type={inputType ? inputType : "text"}
              className={`bg-gray-50 text-sm font-normal px-2 h-[32px] rounded-sm shadow-none focus:outline-none focus:ring-1 focus:ring-travelGreen ${inputStyle ? inputStyle : ""}`}
              key={index}
              placeholder={placeHolder}
              required={isRequired}
              value={inputValue}
              name={inputName}
              onChange={onChange}
          />
          {error ?
              <p className="text-travelRed font-normal text-sm pt-1">{error}</p>
              :
              <p className="hidden">No error</p>
          }
      </div>
  );
};
export default Input;