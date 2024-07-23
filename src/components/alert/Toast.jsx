import React from "react";

const Toast = () => {
  return (
    <div
      className="fixed right-5 top-20 text-white z-50 px-5 py-3 rounded"
      id="toast-stick"
      style={{ display: "none" }}
    >
      <i id="toast-stick-icon" className=""></i>
      <span className="text-white" id="toast-stick-text">
        This is message for this toast.
      </span>
    </div>
  );
};

export default Toast;
