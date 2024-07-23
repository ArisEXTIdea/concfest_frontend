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
  handleDisplayModalConfirm,
  handleShowError,
  handleToastDisplay
} from "../../utils/global_function";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";

const UsersForm = () => {
  // ------------------- HOOKS ------------------- //
  const uc = useSelector((state) => state.userCredential);
  const navigate = useNavigate();

  const [fileData, setFileData] = useState({});

  useEffect(() => {
    changeTitle("Register User");
  }, []);

  // ------------------- API ------------------- //

  const handleSaveData = () => {
    handleDisplayModalConfirm("save-user", 0);
    const dataToSave = arrayNamespace.serializeArrayToObject("form-user");
    dataToSave["avatar"] = fileData["avatar"];

    axios
      .post(`${apiHost}/authentication/register`, dataToSave, {
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
        navigate("/users");
      })
      .catch((err) => {
        try {
          handleShowError(err.response.data.error);
        } catch (err) {
          handleToastDisplay("red", "ri-close-line", "Failed to save user!");
        }
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
        name={`save-user`}
        header="Are you sure to save this user data?"
        description={`The data you input will be saved and you can use it to make festival scheduling `}
        confirmBtnText={"Save"}
        confirmBtnIcon={"ri-save-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={handleSaveData}
      />
      <AdminWraper mn={"Users"}>
        <div>
          <div className="px-3 md:px-5 py-5">
            <Pageheader icon={"ri-user-line"} text={"Register User"} />
          </div>
          <div className="px-3 md:px-5 pb-10">
            <form id="form-user">
              <InputText
                name={"username"}
                label="Username"
                type="text"
                placeholder="username123"
                icon={"ri-user-line"}
              />
              <InputText
                name={"full_name"}
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={"ri-user-line"}
              />
              <InputText
                name={"telephone"}
                label="Telephone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                icon={"ri-phone-line"}
              />
              <InputText
                name={"email"}
                label="Email"
                type="email"
                placeholder="youremail@mail.com"
                icon={"ri-mail-line"}
              />
              <InputText
                name={"avatar"}
                label="Profile_picture"
                type="file"
                icon={"ri-image-line"}
                onChange={handleGetFile}
              />
              <InputText
                name={"password"}
                label="Password"
                type="password"
                placeholder="Type your password"
                icon={"ri-key-line"}
              />
              <InputText
                name={"confirm_password"}
                label="Confirm your password"
                type="password"
                placeholder="Type your password"
                icon={"ri-key-line"}
              />
              <ButtonIcon
                text="Register"
                icon="ri-user-line"
                bgColor="bg-gray-200 hover:bg-gray-100"
                textColor="black"
                iconPosition="l"
                classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
                onClick={() => handleDisplayModalConfirm("save-user", 1)}
                type={"button"}
              />
            </form>
          </div>
        </div>
      </AdminWraper>
    </div>
  );
};

export default UsersForm;
