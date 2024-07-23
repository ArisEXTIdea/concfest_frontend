import React from "react";

const InputSearch = ({ name, icon, onChange, ...rest }) => {
  return (
    <div className="flex items-center">
      <i className={`${icon} absolute text-white pl-3`}></i>
      <input
        id={`input-${name}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-8 pr-5 w-fit"
        {...rest}
        name={name}
        onKeyUp={(e) => (onChange ? onChange(e.target.value) : "")}
      />
    </div>
  );
};

export default InputSearch;
