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
  arrayNamespace,
  changeTitle,
  getSession,
  handleDisplayModalConfirm,
  handleShowError,
  handleToastDisplay
} from "../../utils/global_function";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import $ from "jquery";

const BandForm = () => {
  // ------------------- HOOKS ------------------- //
  const uc = useSelector((state) => state.userCredential);
  const navigate = useNavigate();
  const { bid } = useParams();

  const [sessionData, setSessionData] = useState({});
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    changeTitle(bid ? "Update Band Data" : "Create Band List");
    getSession().then((session) => setSessionData(session));
    if (bid) {
      handleGetBandData();
    }
  }, []);

  // ------------------- API ------------------- //

  const handleSaveData = () => {
    handleDisplayModalConfirm("save-band", 0);
    const dataToSave = arrayNamespace.serializeArrayToObject("form-band");
    dataToSave["logo"] = fileData["logo"];
    dataToSave["created_by"] = sessionData["uid"];

    axios
      .post(`${apiHost}/band/create`, dataToSave, {
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
        navigate("/bands");
      })
      .catch((err) => {
        try {
          handleShowError(err.response.data.error);
        } catch (err) {
          handleToastDisplay("red", "ri-close-line", "Failed to save band!");
        }
      });
  };

  const handleUpdateData = () => {
    handleDisplayModalConfirm("save-band", 0);
    const dataToSave = arrayNamespace.serializeArrayToObject("form-band");
    if (Object.keys(fileData).length > 0) {
      dataToSave["logo"] = fileData["logo"];
    }

    axios
      .put(`${apiHost}/band/update/${bid}`, dataToSave, {
        headers: {
          Authorization: uc,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to update band data!"
        );
        navigate("/bands");
      })
      .catch((err) => {
        try {
          handleShowError(err.response.data.error);
        } catch (err) {
          handleToastDisplay(
            "red",
            "ri-close-line",
            "Failed to update band data!"
          );
        }
      });
  };

  const handleGetBandData = () => {
    axios
      .get(`${apiHost}/band/filter?bid=${bid}`, {
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
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get band data!");
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

  return (
    <div>
      <ModalConfirm
        name={`save-band`}
        header="Are you sure to save this band/artist data?"
        description={`The data you input will be saved and you can use it to make festival scheduling `}
        confirmBtnText={"Save"}
        confirmBtnIcon={"ri-save-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={() => (bid ? handleUpdateData() : handleSaveData())}
      />
      <AdminWraper mn={"Bands"}>
        <div>
          <div className="px-3 md:px-5 py-5">
            <Pageheader icon={"ri-music-line"} text={"Add List Band/Artist"} />
          </div>
          <div className="px-3 md:px-5">
            <form id="form-band">
              <InputText
                name={"band_name"}
                label="Band Name"
                type="text"
                placeholder="Example: Avenged Sevenfold"
                icon={"ri-team-line"}
              />
              <InputText
                name={"country"}
                label="Country"
                type="text"
                placeholder="Example: America"
                icon={"ri-flag-line"}
              />{" "}
              <InputText
                name={"website"}
                label="Website"
                type="text"
                placeholder="Enter Website Link"
                icon={"ri-earth-line"}
              />{" "}
              <InputText
                name={"logo"}
                label="Logo"
                type="file"
                icon={"ri-image-line"}
                onChange={handleGetFile}
              />
              <ButtonIcon
                text="Save"
                icon="ri-save-line"
                bgColor="bg-gray-200 hover:bg-gray-100"
                textColor="black"
                iconPosition="r"
                classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
                onClick={() => handleDisplayModalConfirm("save-band", 1)}
                type={"button"}
              />
            </form>
          </div>
        </div>
      </AdminWraper>
    </div>
  );
};

export default BandForm;
