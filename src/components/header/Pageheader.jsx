import React from "react";
import { useNavigate } from "react-router-dom";

const Pageheader = ({ text, icon }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-white flex items-center gap-2">
        <div>
          <button
            className="hover:text-orange-500 duration-300"
            onClick={() => navigate(-1)}
          >
            <i className="ri-arrow-left-line"></i>
          </button>
        </div>
        <div className="text-2xl">
          {text} <i className={`${icon}`}></i>
        </div>
      </h3>
    </div>
  );
};

export default Pageheader;
