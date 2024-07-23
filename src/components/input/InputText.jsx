import React from "react";
import $ from "jquery";

const InputText = ({ name, label, icon, ...rest }) => {
  const handleRemoveError = () => {
    $(`#input-error-text-${name}`).addClass("hidden");
  };

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="flex items-center relative">
        <i className={`${icon} absolute text-white pl-3`}></i>
        <input
          id={`input-${name}`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-8 pr-5"
          {...rest}
          name={name}
          onKeyUp={handleRemoveError}
        />
      </div>
      <span
        className="text-sm text-red-500 hidden"
        id={`input-error-text-${name}`}
      >
        Error Text
      </span>
    </div>
  );
};

export default InputText;
