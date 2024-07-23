import React, { Fragment, useEffect, useState } from "react";
import { backgroundImage, emptyAnimation } from "../../assets";
import { ButtonIcon, LandingPageNavbar, Pagination } from "../../components";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import {
  timeConverterNamespace,
  handleToastDisplay
} from "../../utils/global_function";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import $ from "jquery";

const Landing = () => {
  // ------------------------ HOOKS ------------------------ //
  const [bandData, setBandData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    handleGetBandDataAll();
    handleGetEventDataPagination();
  }, []);
  // ------------------------ API ------------------------ //

  const handleGetBandDataAll = () => {
    axios
      .get(`${apiHost}/band/search`, {})
      .then((res) => {
        const data = res.data.data;
        setBandData(data);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get band data!");
      });
  };

  const handleGetEventDataPagination = () => {
    axios
      .get(`${apiHost}/event/page/${currentPage}?search=${filter}`)
      .then((res) => {
        const data = res.data.data;
        setEventData(data.data);
        setTotalPage(data.total_page == 0 ? 1 : data.total_page);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get event data!");
      });
  };
  // ------------------------ INTERFACE ------------------------ //
  return (
    <Fragment>
      <LandingPageNavbar />
      <div
        className="w-full h-screen flex justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full">
          <div
            id="intro-screen"
            className="w-full md:h-screen flex flex-wrap flex-col md:flex-row items-center px-5 sm:px-10 md:px-16 duration-300"
          >
            <div className="w-full h-[100vh] md:h-full flex items-center md:items-center">
              <div className="w-full">
                <h1 className="text-white text-4xl md:text-4xl lg:text-6xl pb-5 duration-300 text-center">
                  Enjoy Festival
                </h1>
                <h1 className="text-white text-4xl md:text-4xl lg:text-6xl pb-10 duration-300 text-center">
                  For The Spirit of Life
                </h1>
                <div className="mb-5 w-full flex justify-center">
                  <ul className="text-white pl-4 text-center">
                    <li className=" leading-8">
                      Find festivals and concerts anytime, anywhere
                    </li>
                    <li className=" leading-8">
                      The most complete information with links to purchase
                      websites ticket
                    </li>
                    <li className=" leading-8">
                      Enjoy music from your favorite band live
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-center">
                  <ButtonIcon
                    text="View Concert Schedule"
                    icon="ri-arrow-right-up-line"
                    bgColor="bg-gray-200 hover:bg-gray-100"
                    textColor="black"
                    iconPosition="r"
                    classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
                    onClick={() => {
                      $("html, body").animate(
                        {
                          scrollTop: $("#schedule-date").offset().top
                        },
                        800
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="band-listed" className="bg-slate-900 py-10">
            <div className="flex flex-col items-center">
              <h2 className="text-white text-center">Band Listed</h2>
              <span className="text-white text-center border-b w-fit">
                Band Listed in Our Site
              </span>
            </div>
            <div className="flex gap-10 justify-center mt-10 flex-wrap">
              {bandData.map((item, index) => {
                if (index < 9) {
                  return (
                    <div key={index}>
                      <img
                        src={`${apiHost}/drive/${item.logo}`}
                        alt="Band Logo"
                        className="h-20 mix-blend-screen"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div
            id="schedule-date"
            className="bg-slate-900 px-5 sm:px-10 md:px-16 min-h-[100vh] w-full"
          >
            <div className="w-full text-center pt-20 pb-10">
              <h2 className="text-white">Festival and Concert Schedule</h2>
              <span className="text-white underline underline-offset-8">
                View the schedule of upcoming festivals and Concerts
              </span>
            </div>
            <div className="flex justify-around pb-5 w-full">
              <div className="flex flex-col justify-around w-full">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b bg-gray-800">
                      <th className="py-4 px-5">No</th>
                      <th>Event Name</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Website</th>
                      <th>Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData.map((item, index) => {
                      return (
                        <tr
                          className="bg-gray-900 hover:bg-gray-800 duration-300"
                          key={index}
                        >
                          <td className="py-3 text-center">{index + 1}</td>
                          <td>{item.event_name}</td>
                          <td>{item.location}</td>
                          <td>
                            {timeConverterNamespace.convertEpochToDateNoTime(
                              item.start_date
                            )}
                            {item.start_date != item.end_date
                              ? `-${timeConverterNamespace.convertEpochToDateNoTime(
                                  item.end_date
                                )}`
                              : ""}
                          </td>
                          <td className="text-center text-blue-500">
                            {item.website_ticket ? (
                              <a href={item.website_ticket}>
                                <i className="ri-external-link-line"></i>
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="text-center text-blue-500">
                            <Link
                              to={`/event-scheduled/${item["event_name"]
                                .split(" ")
                                .join("-")}`}
                            >
                              <i className="ri-eye-line"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {eventData.length == 0 ? (
                  <div>
                    <div className="w-full flex justify-center pb-10">
                      <Lottie
                        loop
                        animationData={emptyAnimation}
                        play
                        style={{ width: 300 }}
                        speed={1}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Pagination
                handleSetPage={(page) => setCurrentPage(page)}
                totalPage={totalPage}
              />
            </div>
          </div>
          <div id="footer" className="bg-slate-800">
            <footer className="text-center text-white py-5">
              Concfest - {new Date().getFullYear()}
            </footer>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
