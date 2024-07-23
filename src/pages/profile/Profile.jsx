import React, { useEffect, useState } from "react";
import {
  AdminWraper,
  ButtonIcon,
  InputText,
  ModalPopUp,
  Pageheader
} from "../../components";
import { useSelector } from "react-redux";
import {
  timeConverterNamespace,
  getSession,
  handleDisplayModalPopUp,
  handleToastDisplay,
  updateSession,
  arrayNamespace
} from "../../utils/global_function";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";

const Profile = () => {
  // --------------------- HOOKS --------------------- //
  const uc = useSelector((state) => state.userCredential);

  const [userData, setUserData] = useState({});
  const [formType, setFormType] = useState("text");
  const [formSettingData, setFormSettingData] = useState({});
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    getSession().then((sessionData) => {
      handelGetUserData(sessionData.uid);
    });
  }, []);

  // --------------------- API --------------------- //

  const handelGetUserData = (uid) => {
    axios
      .get(`${apiHost}/authentication/users/filter?uid=${uid}`, {
        headers: { Authorization: uc }
      })
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get user data!");
      });
  };

  const handleUpdateUser = () => {
    const dataToUpdate =
      arrayNamespace.serializeArrayToObject("form-change-users");
    if (formType == "file") {
      Object.keys(fileData).map((key) => {
        dataToUpdate[key] = fileData[key];
      });
    }

    axios
      .put(
        `${apiHost}/authentication/users/update/${userData.uid}`,
        dataToUpdate,
        {
          headers: {
            Authorization: uc,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to update profile!"
        );

        updateSession().then((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to update profile!");
      });
  };

  // --------------------- INTERFACE --------------------- //

  const handleSettingForm = (data, formType) => {
    setFormType(formType);
    setFormSettingData(data);
    handleDisplayModalPopUp("change-data", 1);
  };

  const handleGetFile = (e) => {
    const file = e.target.files[0];
    const fileToUpdate = { ...fileData };

    fileToUpdate[e.target.name] = file;

    setFileData(fileToUpdate);
  };

  return (
    <div>
      <ModalPopUp name={`change-data`} popupHeader={"Change My Profile"}>
        <form id="form-change-users">
          <InputText
            name={formSettingData.name}
            label={formSettingData.label}
            type={formType}
            defaultValue={userData[formSettingData.name]}
            icon={"ri-pencil-line"}
            onChange={(e) => (formType == "file" ? handleGetFile(e) : "")}
          />
          <ButtonIcon
            text="Save"
            bgColor="bg-gray-100 hover:bg-gray-200"
            textColor="black"
            iconPosition="l"
            classAdd="rounded "
            type="button"
            icon={"ri-save-line"}
            onClick={handleUpdateUser}
          />
        </form>
      </ModalPopUp>
      <AdminWraper mn={"Profile"}>
        <div className="px-3 md:px-5 pt-5 pb-3">
          <div className="pb-5">
            <Pageheader text="My Profile" icon="ri-user-line" />
          </div>
          <div className="flex gap-3 items-center mb-5">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500">
              <img
                src={`${apiHost}/drive/${userData.avatar}`}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-3xl">
                {userData.full_name}
              </span>
              <span className="bg-blue-500 text-sm text-center rounded-full w-fit px-5 mb-3">
                Admin
              </span>
            </div>
          </div>
          <div>
            <div className="bg-slate-700 w-full rounded-lg shadow-xl">
              <div className="p-4 border-b border-slate-600 ">
                <h2 className="text-2xl text-white">Applicant Information</h2>
                <p className="text-sm text-gray-300">
                  Personal details and application.
                </p>
              </div>
              <div>
                <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                  <p className="text-white">Full name</p>
                  <p className="text-white">
                    : {userData.full_name}
                    <button
                      className="hover:bg-blue-500 w-7 h-7 rounded-full"
                      onClick={() =>
                        handleSettingForm(
                          { name: "full_name", label: "Full Name" },
                          "text"
                        )
                      }
                    >
                      <i className="ri-pencil-line"></i>
                    </button>
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                  <p className="text-white">Email</p>
                  <p className="text-white">
                    : {userData.email}
                    <button
                      className="hover:bg-blue-500 w-7 h-7 rounded-full"
                      onClick={() =>
                        handleSettingForm(
                          { name: "email", label: "Email" },
                          "email"
                        )
                      }
                    >
                      <i className="ri-pencil-line"></i>
                    </button>
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                  <p className="text-white">Phone</p>
                  <p className="text-white">
                    : {userData.telephone}
                    <button
                      className="hover:bg-blue-500 w-7 h-7 rounded-full"
                      onClick={() =>
                        handleSettingForm(
                          { name: "telephone", label: "Telephone" },
                          "text"
                        )
                      }
                    >
                      <i className="ri-pencil-line"></i>
                    </button>
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                  <p className="text-white">Date Created</p>
                  <p className="text-white">
                    :{" "}
                    {timeConverterNamespace.convertEpochToDate(
                      userData.created_at
                    )}
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                  <p className="text-white">Last Update</p>
                  <p className="text-white">
                    :{" "}
                    {timeConverterNamespace.convertEpochToDate(
                      userData.updated_at
                    )}
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4">
                  <p className="text-white">Avatar</p>
                  <div className="space-y-2 flex gap-2 text-white">
                    :{" "}
                    <div>
                      <ButtonIcon
                        text="Change Avatar"
                        bgColor="bg-gray-200 hover:bg-gray-100"
                        textColor="black"
                        iconPosition="l"
                        classAdd="rounded"
                        type="button"
                        icon={"ri-upload-line"}
                        onClick={() =>
                          handleSettingForm(
                            { name: "avatar", label: "Avatar" },
                            "file"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminWraper>
    </div>
  );
};

export default Profile;
