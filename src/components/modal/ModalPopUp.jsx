import React from "react";
import { handleDisplayModalPopUp } from "../../utils/global_function";

const ModalPopUp = ({ children, popupHeader, name }) => {
  return (
    <div
      className="fixed w-full h-screen flex justify-center items-center bg-slate-900 bg-opacity-80 z-50"
      id={`modal-popup-${name}`}
      style={{ display: "none" }}
    >
      <div className="bg-slate-700 p-5 rounded max-w-[700px]">
        <div className="w-full flex justify-between mb-5">
          <h3 className="text-white">{popupHeader}</h3>
          <button
            className="text-white"
            onClick={() => handleDisplayModalPopUp(name, 0)}
          >
            <i className="ri-close-line hover:text-xl"></i>
          </button>
        </div>
        <div className=" max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default ModalPopUp;
