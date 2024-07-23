import React, { useEffect, useState } from "react";
import $ from "jquery";
import {
  getSession,
  handleDisplayModalConfirm
} from "../../utils/global_function";
import { apiHost } from "../../utils/global_variable";
import { useDispatch } from "react-redux";

const AdminHeader = () => {
  const handleOpenNavbar = () => {
    $("#admin-navbar").animate({ width: "toggle" });
  };

  const dispatch = useDispatch();

  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    getSession()
      .then((res) => setSessionData(res))
      .catch((err) => {
        dispatch({ type: "DELETE_AUTH_CREDENTIAL" });
      });
  }, []);

  return (
    <div
      className="w-full px-5 flex justify-between items-center py-1 bg-slate-900"
      id="admin-header"
    >
      <div>
        <button onClick={handleOpenNavbar}>
          <i className="ri-menu-line text-white"></i>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <span className="text-white text-xs px-5 bg-blue-500 rounded-full">
            Admin
          </span>
        </div>
        <div>
          <span className="text-white font-semibold">
            {sessionData.full_name}
          </span>
        </div>
        <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
          <img
            src={`${apiHost}/drive/${sessionData.avatar}`}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <button
            className="text-white"
            title="Logout"
            onClick={() => handleDisplayModalConfirm("logout", 1)}
          >
            <i className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
