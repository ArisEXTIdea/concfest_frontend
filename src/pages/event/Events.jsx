import React, { useEffect, useState } from "react";
import {
  AdminWraper,
  ButtonLinkIcon,
  ModalConfirm,
  ModalPopUp,
  Pageheader,
  Pagination
} from "../../components";
import InputSearch from "../../components/input/InputSearch";
import { useSelector } from "react-redux";
import {
  changeTitle,
  timeConverterNamespace,
  handleDisplayModalConfirm,
  handleDisplayModalPopUp,
  handleToastDisplay,
  convertToIDR
} from "../../utils/global_function";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { emptyAnimation } from "../../assets";

const Events = () => {
  // ------------------------- HOOKS ------------------------- //
  const uc = useSelector((state) => state.userCredential);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [eventData, setEventData] = useState([]);
  const [eventSelected, setEventSelected] = useState({});

  useEffect(() => {
    changeTitle("Events");
    handleGetEventDataPagination();
  }, [filter]);

  // ------------------------- API ------------------------- //

  const handleGetEventDataPagination = () => {
    axios
      .get(`${apiHost}/event/page/${currentPage}?search=${filter}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        const data = res.data.data;
        setEventData(data.data);
        setTotalPage(data.total_page == 0 ? 1 : data.total_page);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get event data!");
      });
  };

  const handleDeleteEvent = () => {
    handleDisplayModalConfirm("delete-event", 0);
    axios
      .delete(`${apiHost}/event/delete/${eventSelected["eid"]}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to delete event data!"
        );
        handleGetEventDataPagination();
      })
      .catch((err) => {
        handleToastDisplay(
          "red",
          "ri-close-line",
          "Failed to delete event data!"
        );
      });
  };

  // ------------------------- INTERFACE ------------------------- //

  return (
    <div>
      <ModalConfirm
        name={`delete-event`}
        header="Are you sure to delete this event data?"
        description={`The data you input will be removed and you can't use it to make festival scheduling `}
        confirmBtnText={"Delete"}
        confirmBtnIcon={"ri-delete-bin-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={handleDeleteEvent}
      />
      <ModalPopUp name={"event-detail"} popupHeader={"Event Detail"}>
        <div>
          <div className="bg-slate-700 w-full rounded-lgl">
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Event Name</p>
                <p className="text-white">: {eventSelected.event_name}</p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Location</p>
                <p className="text-white">: {eventSelected.location}</p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Date</p>
                <p className="text-white">
                  :{" "}
                  {eventSelected.start_date === eventSelected.end_date
                    ? timeConverterNamespace.convertEpochToDateNoTime(
                        eventSelected.start_date
                      )
                    : `${timeConverterNamespace.convertEpochToDateNoTime(
                        eventSelected.start_date
                      )} - ${timeConverterNamespace.convertEpochToDateNoTime(
                        eventSelected.end_date
                      )}`}
                </p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Bands</p>
                <p className="text-white">
                  :
                  {eventSelected.bands
                    ? JSON.parse(eventSelected.bands)
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
                  : {convertToIDR(eventSelected.ticket_price)}
                </p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Buy Ticket Here</p>
                <a
                  className=" text-blue-500"
                  href={eventSelected.website_ticket}
                >
                  : {eventSelected.website_ticket}{" "}
                  <i className="ri-external-link-line"></i>
                </a>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Banner</p>
                <p className="text-white flex gap-1">
                  :
                  <img
                    src={`${apiHost}/drive/${eventSelected.banner}`}
                    alt="Event Banner"
                    className="w-44"
                  />
                </p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Created At</p>
                <p className="text-white">
                  :{" "}
                  {timeConverterNamespace.convertEpochToDate(
                    eventSelected.created_at
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
                    eventSelected.updated_at
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalPopUp>
      <AdminWraper mn={"Event"}>
        <div>
          <div className="px-3 md:px-5 pt-5 pb-5">
            <Pageheader text={"List Event"} icon={"ri-music-line"} />
          </div>
          <div className="px-3 md:px-5 mb-5">
            <ButtonLinkIcon
              text="Add Event"
              bgColor="bg-blue-600 hover:bg-blue-500"
              textColor="white"
              iconPosition="l"
              classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
              type="button"
              icon={"ri-add-line"}
              to="/event/add-event"
            />
          </div>
          <div>
            <div className="px-3 md:px-5 mb-5">
              <InputSearch
                icon={"ri-search-line"}
                placeholder="Cari event..."
                onChange={(data) => {
                  setFilter(data);
                }}
              />
            </div>
            <div className="flex flex-col justify-around pb-5 px-3 md:px-5">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b bg-gray-800">
                    <th className="py-4 px-5">No</th>
                    <th>Event Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Website</th>
                    <th>
                      <i className="ri-settings-2-line"></i>
                    </th>
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
                            <a href={item.website_ticket} target="_blank">
                              <i className="ri-external-link-line"></i>
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <div className="flex gap-5 w-full justify-center">
                            <button
                              onClick={() => {
                                setEventSelected(item);
                                handleDisplayModalPopUp("event-detail", 1);
                              }}
                            >
                              <i className="ri-eye-line hover:text-green-500"></i>
                            </button>
                            <Link to={`/event/update-event/${item.eid}`}>
                              <i className="ri-pencil-line hover:text-blue-500"></i>
                            </Link>
                            <button
                              onClick={() => {
                                handleDisplayModalConfirm("delete-event", 1);
                                setEventSelected(item);
                              }}
                            >
                              <i className="ri-delete-bin-line hover:text-red-500"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {eventData.length == 0 ? (
                <div>
                  <div className="w-full flex justify-center pt-10 pb-10">
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
      </AdminWraper>
    </div>
  );
};

export default Events;
