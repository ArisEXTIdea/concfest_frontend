import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import ModalConfirm from "../modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import { handleToastDisplay } from "../../utils/global_function";
const AdminWraper = ({ children, mn }) => {
  const uc = useSelector((state) => state.userCredential);
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios
      .post(`${apiHost}/authentication/logout`, { token: uc })
      .then((res) => {
        dispatch({ type: "DELETE_AUTH_CREDENTIAL" });
        window.location = "/";
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Logout failed!");
      });
  };

  return (
    <div className="flex bg-slate-800 relative">
      <ModalConfirm
        name={`logout`}
        header="Are you sure to log out?"
        description={`After you log out you will be directed to the landing page`}
        confirmBtnText={"Log Out"}
        confirmBtnIcon={"ri-logout-box-r-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={handleLogout}
      />
      <div className="sticky top-0 h-screen">
        <AdminNavbar mn={mn} />
      </div>
      <div className={`w-full`}>
        <div className="sticky top-0 z-40">
          <AdminHeader />
        </div>
        <div
          className="min-h-screen overflow-x-auto flex flex-col justify-between z-30"
          id="main-content"
        >
          <main>{children}</main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

export default AdminWraper;
