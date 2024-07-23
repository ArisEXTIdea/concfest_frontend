import React, { Fragment } from "react";

const ButtonIcon = ({ text, icon, ...rest }) => {
  return (
    <Fragment>
      <button>
        <i className={icon}></i>
        {text}
      </button>
    </Fragment>
  );
};

export default ButtonIcon;
