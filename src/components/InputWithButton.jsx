import React from "react";

const InputWithButton = ({
  placeholder = "Enter text",
  buttonText = "Submit",
  onSubmit = () => {},
  inputType = "text",
  inputClassName = "",
  buttonClassName = "",
  containerClassName = "",
}) => {
  return (
    <div className={`flex ${containerClassName}`}>
      <input
        type={inputType}
        placeholder={placeholder}
        className={`rounded-l-lg border p-4 focus:rounded-l-lg focus:rounded-r-none focus:border-secondary focus:outline-none focus:ring-secondary ${inputClassName}`}
      />
      <button
        className={`rounded-r-lg bg-secondary px-2 text-white ${buttonClassName}`}
        onClick={onSubmit}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputWithButton;