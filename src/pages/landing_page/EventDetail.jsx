import React, { Fragment, useEffect, useState } from "react";
import { backgroundImage, emptyAnimation } from "../../assets";
import { ButtonIcon, LandingPageNavbar, Pagination } from "../../components";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import {
  timeConverterNamespace,
  convertToIDR,
  handleToastDisplay
} from "../../utils/global_function";
import Lottie from "react-lottie-player";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  // ------------------------ HOOKS ------------------------ //
  const [eventData, setEventData] = useState({});

  const { eventname } = useParams();

  useEffect(() => {
    handleGetBandDataAll();
  }, []);
  // ------------------------ API ------------------------ //

  const handleGetBandDataAll = () => {
    axios
      .get(
        `${apiHost}/event/filter?event_name=${eventname.split("-").join(" ")}`
      )
      .then((res) => {
        const data = res.data.data[0];
        setEventData(data);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get band data!");
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
            id="event-data"
            className="w-full md:h-screen flex flex-wrap flex-col md:flex-row items-center px-5 sm:px-10 md:px-16 duration-300"
          >
            <div className="mt-32 md:mt-0 w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
              <img
                src={`${apiHost}/drive/${eventData.banner}`}
                alt="Banner"
                className="md:h-[50vh]"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div>
                <div className="bg-slate-700 w-full rounded-lgl">
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Event Name</p>
                      <p className="text-white">: {eventData.event_name}</p>
                    </div>
                  </div>
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Location</p>
                      <p className="text-white">: {eventData.location}</p>
                    </div>
                  </div>
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Date</p>
                      <p className="text-white">
                        :{" "}
                        {eventData.start_date === eventData.end_date
                          ? timeConverterNamespace.convertEpochToDateNoTime(
                              eventData.start_date
                            )
                          : `${timeConverterNamespace.convertEpochToDateNoTime(
                              eventData.start_date
                            )} - ${timeConverterNamespace.convertEpochToDateNoTime(
                              eventData.end_date
                            )}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Bands</p>
                      <p className="text-white">
                        :
                        {eventData.bands
                          ? JSON.parse(eventData.bands)
                              .map((band) => band.band_name)
                              .join(", ")
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Ticket Price</p>
                      <p className="text-white">
                        : {convertToIDR(eventData.ticket_price)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Buy Ticket Here</p>
                      <a
                        className=" text-blue-500"
                        href={eventData.website_ticket}
                      >
                        : {eventData.website_ticket}{" "}
                        <i className="ri-external-link-line"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Created At</p>
                      <p className="text-white">
                        :{" "}
                        {timeConverterNamespace.convertEpochToDate(
                          eventData.created_at
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                      <p className="text-white">Last Update</p>
                      <p className="text-white">
                        :{" "}
                        {timeConverterNamespace.convertEpochToDate(
                          eventData.updated_at
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

export default EventDetail;
