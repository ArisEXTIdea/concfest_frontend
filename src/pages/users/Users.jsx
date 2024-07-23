import React, { useEffect, useState } from "react";
import {
  AdminWraper,
  ButtonIcon,
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
  getSession,
  handleDisplayModalConfirm,
  handleToastDisplay
} from "../../utils/global_function";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { emptyAnimation } from "../../assets";

const Users = () => {
  // ------------------------- HOOKS ------------------------- //
  const uc = useSelector((state) => state.userCredential);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [userData, setUserData] = useState([]);
  const [userSelected, setUserSelected] = useState({});
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    changeTitle("Users");
    handleGetUserDataPagination();
    getSession().then((res) => setSessionData(res));
  }, [filter, currentPage]);

  // ------------------------- API ------------------------- //

  const handleGetUserDataPagination = () => {
    axios
      .get(
        `${apiHost}/authentication/users/page/${currentPage}?search=${filter}`,
        {
          headers: {
            Authorization: uc
          }
        }
      )
      .then((res) => {
        const data = res.data.data;
        setUserData(data.data);
        setTotalPage(data.total_page == 0 ? 1 : data.total_page);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get user data!");
      });
  };

  const handleDeleteUser = () => {
    handleDisplayModalConfirm("delete-user", 0);
    axios
      .delete(`${apiHost}/authentication/users/delete/${userSelected["uid"]}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to delete user data!"
        );
        handleGetUserDataPagination();
      })
      .catch((err) => {
        handleToastDisplay(
          "red",
          "ri-close-line",
          "Failed to delete user data!"
        );
      });
  };

  // ------------------------- INTERFACE ------------------------- //

  return (
    <div>
      <ModalConfirm
        name={`delete-user`}
        header="Are you sure to delete this user data?"
        description={`The data you input will be removed and you can't use it to make festival scheduling `}
        confirmBtnText={"Delete"}
        confirmBtnIcon={"ri-delete-bin-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={handleDeleteUser}
      />
      <AdminWraper mn={"Users"}>
        <div>
          <div className="px-3 md:px-5 pt-5 pb-5">
            <Pageheader text={"List User"} icon={"ri-team-line"} />
          </div>
          <div className="px-3 md:px-5 mb-5">
            <ButtonLinkIcon
              text="Add User"
              bgColor="bg-blue-600 hover:bg-blue-500"
              textColor="white"
              iconPosition="l"
              classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
              type="button"
              icon={"ri-add-line"}
              to="/users/add-user"
            />
          </div>
          <div>
            <div className="px-3 md:px-5 mb-5">
              <InputSearch
                icon={"ri-search-line"}
                placeholder="Serach user..."
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
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>
                      <i className="ri-settings-2-line"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item, index) => {
                    return (
                      <tr
                        className="bg-gray-900 hover:bg-gray-800 duration-300"
                        key={index}
                      >
                        <td className="py-3 text-center">{index + 1}</td>
                        <td>
                          <div className="w-full flex justify-center">
                            <div className="w-16 h-16 rounded-full flex justify-center overflow-hidden my-2">
                              <img
                                src={`${apiHost}/drive/${item.avatar}`}
                                alt="User Avatar"
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </td>
                        <td>@{item.username}</td>
                        <td className="text-center">{item.full_name}</td>
                        <td>
                          <div className="flex gap-5 w-full justify-center">
                            <Link
                              to={
                                sessionData.uid == item.uid
                                  ? `/profile`
                                  : `/users/profile/${item.uid}`
                              }
                            >
                              <i className="ri-eye-line hover:text-green-500"></i>
                            </Link>
                            <Link
                              to={
                                sessionData.uid == item.uid
                                  ? `/profile`
                                  : `/users/profile/${item.uid}`
                              }
                            >
                              <i className="ri-pencil-line hover:text-blue-500"></i>
                            </Link>
                            <button
                              onClick={() => {
                                handleDisplayModalConfirm("delete-user", 1);
                                setUserSelected(item);
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
              {userData.length == 0 ? (
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
              handleSetPage={(page) => {
                setCurrentPage(page);
              }}
              totalPage={totalPage}
            />
          </div>
        </div>
      </AdminWraper>
    </div>
  );
};

export default Users;
