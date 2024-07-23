import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
      }}
    >
      <div className="w-full h-screen backdrop-blur-sm flex justify-center items-center flex-col gap-3 leading-[1]">
        <h1 className=" text-white text-[100px] md:text-[200px] duration-300">
          404
        </h1>
        <span className="text-white text-3xl">Page Not Found</span>
        <Link
          to={`/`}
          className="text-white bg-blue-600 hover:bg-blue-500 py-2 px-5 rounded-full duration-300"
        >
          Back to home <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
