import React, { Fragment } from "react";

const ButtonIcon = ({
  text,
  icon,
  bgColor,
  textColor,
  classAdd,
  iconPosition,
  ...rest
}) => {
  return (
    <Fragment>
      <button
        className={`flex gap-2 px-5 py-2 ${classAdd} ${bgColor} duration-300 ${
          iconPosition === "r" ? "flex-row-reverse" : ""
        }`}
        {...rest}
      >
        <span className={`text-${textColor}`}>
          <i className={icon}></i>
        </span>
        <span className={`text-${textColor}`}>{text}</span>
      </button>
    </Fragment>
  );
};

export default ButtonIcon;
