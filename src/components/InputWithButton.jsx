import React, { useState } from "react";

const InputWithButton = ({
  placeholder = "Enter text",
  buttonText = "Submit",
  onSubmit = () => {},
  inputType = "text",
  inputClassName = "",
  buttonClassName = "",
  containerClassName = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(inputValue);
      setInputValue("");
    } catch (error) {
      // İsterseniz burada da ortak error handler kullanabilirsiniz
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-0 ${containerClassName}`}
    >
      <input
        type={inputType}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 rounded-l-lg border border-gray-300 px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary ${inputClassName}`}
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={!inputValue.trim() || isSubmitting}
        className={`rounded-r-lg bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${buttonClassName}`}
      >
        {isSubmitting ? "..." : buttonText}
      </button>
    </form>
  );
};

export default InputWithButton;
