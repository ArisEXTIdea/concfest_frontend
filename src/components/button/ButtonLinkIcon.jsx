import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ButtonLinkIcon = ({
  text,
  icon,
  bgColor,
  textColor,
  classAdd,
  iconPosition,
  to,
  ...rest
}) => {
  return (
    <Fragment>
      <Link
        to={to}
        className={`flex gap-2 px-5 py-2 ${classAdd} ${bgColor} w-fit ${
          iconPosition === "r" ? "flex-row-reverse" : ""
        }`}
        {...rest}
      >
        <span className={`text-${textColor}`}>
          <i className={icon}></i>
        </span>
        <span className={`text-${textColor}`}>{text}</span>
      </Link>
    </Fragment>
  );
};

export default ButtonLinkIcon;
