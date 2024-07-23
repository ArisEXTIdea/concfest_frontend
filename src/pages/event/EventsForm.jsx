import React, { useEffect, useState } from "react";
import {
  AdminWraper,
  ButtonIcon,
  InputText,
  ModalConfirm,
  Pageheader
} from "../../components";
import { useSelector } from "react-redux";
import {
  changeTitle,
  timeConverterNamespace,
  getSession,
  handleDisplayModalConfirm,
  handleShowError,
  handleToastDisplay,
  arrayNamespace
} from "../../utils/global_function";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import $ from "jquery";
import InputSearch from "../../components/input/InputSearch";

const EventsForm = () => {
  // ------------------- HOOKS ------------------- //
  const uc = useSelector((state) => state.userCredential);
  const navigate = useNavigate();
  const { eid } = useParams();

  const [sessionData, setSessionData] = useState({});
  const [fileData, setFileData] = useState({});
  const [filter, setFilter] = useState("");
  const [bandData, setBandData] = useState([]);
  const [bandSelected, setBandSelected] = useState([]);

  useEffect(() => {
    changeTitle(eid ? "Update event Data" : "Create event list");
    getSession().then((session) => setSessionData(session));
    if (eid) {
      handleGetEventData();
    }
    handleGetBandData();
  }, [filter]);

  // ------------------- API ------------------- //

  const handleSaveData = () => {
    handleDisplayModalConfirm("save-event", 0);
    const dataToSave = arrayNamespace.serializeArrayToObject("form-event");
    dataToSave["banner"] = fileData["banner"];
    dataToSave["created_by"] = sessionData["uid"];
    dataToSave["bands"] = JSON.stringify(bandSelected);

    axios
      .post(`${apiHost}/event/create`, dataToSave, {
        headers: {
          Authorization: uc,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to save profile!"
        );
        setTimeout(() => {
          navigate("/event");
        }, 1000);
      })
      .catch((err) => {
        try {
          handleShowError(err.response.data.error);
        } catch (err) {
          handleToastDisplay("red", "ri-close-line", "Failed to save event!");
        }
      });
  };

  const handleUpdateData = () => {
    handleDisplayModalConfirm("save-event", 0);
    const dataToSave = arrayNamespace.serializeArrayToObject("form-event");
    if (Object.keys(fileData).length > 0) {
      dataToSave["banner"] = fileData["banner"];
    }
    dataToSave["bands"] = JSON.stringify(bandSelected);

    axios
      .put(`${apiHost}/event/update/${eid}`, dataToSave, {
        headers: {
          Authorization: uc,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to update event data!"
        );
        setTimeout(() => {
          navigate("/event");
        }, 1000);
      })
      .catch((err) => {
        try {
          handleShowError(err.response.data.error);
        } catch (err) {
          handleToastDisplay(
            "red",
            "ri-close-line",
            "Failed to update event data!"
          );
        }
      });
  };

  const handleGetEventData = () => {
    axios
      .get(`${apiHost}/event/filter?eid=${eid}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        const data = res.data.data[0];

        Object.keys(data).forEach((key) => {
          try {
            $(`#input-${key}`).val(data[key]);
          } catch (err) {
            return;
          }
        });
        $(`#input-start_date`).val(
          timeConverterNamespace.convertEpochToInputDate(data["start_date"])
        );
        $(`#input-end_date`).val(
          timeConverterNamespace.convertEpochToInputDate(data["end_date"])
        );
        setBandSelected(JSON.parse(data["bands"]));
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get event data!");
      });
  };

  const handleGetBandData = () => {
    axios
      .get(`${apiHost}/band/search?band_name=${filter}&country=${filter}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        const data = res.data.data;
        setBandData(data);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get event data!");
      });
  };

  // ------------------- INTERFACE ------------------- //

  const handleGetFile = (e) => {
    setFileData({});
    const file = e.target.files[0];
    const fileToUpdate = { ...fileData };

    fileToUpdate[e.target.name] = file;

    setFileData(fileToUpdate);
  };

  const handleSetBandSelected = (data, state) => {
    const bandDataRenew = [...bandSelected];

    if (state === 1) {
      if (
        bandDataRenew.filter((item) => item.band_name === data.band_name)
          .length == 0
      ) {
        bandDataRenew.push({
          bid: data.bid,
          band_name: data.band_name,
          country: data.country
        });
      }
    } else {
      const index = bandDataRenew.findIndex(
        (band) => band.band_name === data.band_name
      );
      bandDataRenew.splice(index, 1);
    }

    setBandSelected(bandDataRenew);
  };

  return (
    <div>
      <ModalConfirm
        name={`save-event`}
        header="Are you sure to save this event data?"
        description={`The data you input will be saved and you can use it to make festival scheduling `}
        confirmBtnText={"Save"}
        confirmBtnIcon={"ri-save-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={() => (eid ? handleUpdateData() : handleSaveData())}
      />
      <AdminWraper mn={"Event"}>
        <div className="mb-10">
          <div className="px-3 md:px-5 py-5">
            <Pageheader icon={"ri-music-line"} text={"Add List Event"} />
          </div>
          <div className="px-3 md:px-5">
            <form id="form-event">
              <InputText
                name={"event_name"}
                label="Event Name"
                type="text"
                placeholder="Technofest"
                icon={"ri-music-2-line"}
              />
              <InputText
                name={"location"}
                label="Location"
                type="text"
                placeholder="Example: Indonesia"
                icon={"ri-map-pin-line"}
              />
              <InputText
                name={"location_maps"}
                label="Location Maps"
                type="text"
                placeholder="Paste your google maps location"
                icon={"ri-map-pin-line"}
              />
              <InputText
                name={"start_date"}
                label="Event Start Date"
                type="date"
                icon={"ri-calendar-line"}
              />
              <InputText
                name={"end_date"}
                label="Event End Date"
                type="date"
                icon={"ri-calendar-line"}
              />
              <InputText
                name={"ticket_price"}
                label="Ticket Price"
                type="number"
                placeholder="Example: 1000000000"
                icon={"ri-ticket-line"}
              />
              <InputText
                name={"website_ticket"}
                label="Ticket Website"
                type="text"
                placeholder="Example: Enter event website to buy ticket"
                icon={"ri-earth-line"}
              />
              <InputText
                name={"banner"}
                label="Event Banner"
                type="file"
                icon={"ri-image-line"}
                onChange={handleGetFile}
              />
              <div className="w-full border p-5 rounded border-gray-600 mb-5">
                <h3 className="text-white mb-3">Add Band List</h3>
                <InputSearch
                  icon={"ri-search-line"}
                  placeholder="type band name"
                  onChange={(data) => {
                    setFilter(data);
                  }}
                />
                <div className="mt-3">
                  <ul className="flex gap-1">
                    {bandSelected.map((item, index) => {
                      return (
                        <li key={index}>
                          <button
                            type="button"
                            className="px-3 py-2 bg-green-500 text-white rounded"
                            onClick={() => handleSetBandSelected(item, -1)}
                          >
                            {item.band_name} <i className="ri-close-line"></i>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="mt-5">
                  <span className="text-white inline-block mb-3">
                    Search result:
                  </span>
                  <div>
                    <ul>
                      {bandData.map((item, index) => {
                        if (filter !== "") {
                          return (
                            <li key={index}>
                              <button
                                className="py-2 px-5 bg-slate-500 rounded flex text-white text-left items-center gap-5"
                                type="button"
                                onClick={() => handleSetBandSelected(item, 1)}
                              >
                                <div className="flex flex-col">
                                  <span className="text-white">
                                    {item.band_name}
                                  </span>
                                  <span className="text-xs text-gray-200">
                                    {item.country}
                                  </span>
                                </div>
                                <div>
                                  <i className="ri-add-line "></i>
                                </div>
                              </button>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <ButtonIcon
                text="Save"
                icon="ri-save-line"
                bgColor="bg-gray-200 hover:bg-gray-100"
                textColor="black"
                iconPosition="r"
                classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
                onClick={() => handleDisplayModalConfirm("save-event", 1)}
                type={"button"}
              />
            </form>
          </div>
        </div>
      </AdminWraper>
    </div>
  );
};

export default EventsForm;
