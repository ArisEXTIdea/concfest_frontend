import React, { useEffect } from "react";
import { brandLogo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import $ from "jquery";
import { changeTitle } from "../../utils/global_function";

const LandingPageNavbar = () => {
  const uc = useSelector((state) => state.userCredential);
  const navigate = useNavigate();

  useEffect(() => {
    changeTitle("Welcome");
    if (window.innerWidth < 768) {
      $("#landing-navbar").css("display", "none");
    }
  });

  const handleShowMenu = () => {
    $("#landing-navbar").slideToggle();
  };

  $(window).resize(() => {
    if (window.innerWidth > 768) {
      $("#landing-navbar").removeAttr("style");
    } else {
      $("#landing-navbar").css("display", "none");
    }
  });

  return (
    <div
      id="navbar-landing-page"
      className="flex flex-col md:flex-row w-full justify-between duration-300 px-5 sm:px-10 md:px-16 py-3 md:items-center fixed z-40 backdrop-blur-md bg-slate-800 bg-opacity-90"
    >
      <div className="flex-1 flex justify-between items-center">
        <div>
          <img src={brandLogo} alt="Brand" className="w-32" />
        </div>
        <div className="md:hidden duration-300">
          <button onClick={handleShowMenu}>
            <i className="ri-menu-line text-xl text-white"></i>
          </button>
        </div>
      </div>
      <div
        className="flex-1 flex md:block duration-300 py-10 md:py-0"
        id="landing-navbar"
      >
        <nav className="w-full">
          <ul className="flex flex-col md:flex-row gap-5 md:gap-10 duration-300 items-center md:justify-end text-white">
            <li>
              <button
                className="hover:underline hover:underline-offset-8 duration-300 whitespace-nowrap"
                onClick={() => {
                  try {
                    $("html, body").animate(
                      {
                        scrollTop: $("#intro-screen").offset().top
                      },
                      800
                    );
                  } catch (err) {
                    navigate("/");
                  }
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="hover:underline hover:underline-offset-8 duration-300 whitespace-nowrap"
                onClick={() => {
                  try {
                    $("html, body").animate(
                      {
                        scrollTop: $("#schedule-date").offset().top
                      },
                      800
                    );
                  } catch (err) {
                    navigate("/");
                  }
                }}
              >
                Agenda
              </button>
            </li>
            {uc.noLogin ? (
              <li>
                <Link
                  to="/login"
                  className="py-2 px-5 border border-white rounded-md"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/dashboard"
                  className="py-2 px-5 border border-white rounded-md"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
