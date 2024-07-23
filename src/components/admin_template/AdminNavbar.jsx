import React from "react";
import { brandLogo } from "../../assets";
import $ from "jquery";
import { Link } from "react-router-dom";

const AdminNavbar = ({ mn }) => {
  // ---------------------- HOOKS & Variables ----------------------//
  const menu = [
    { menu_name: "Dashboard", url: "/dashboard", icon: "ri-dashboard-line" },
    { menu_name: "Event", url: "/event", icon: "ri-calendar-event-line" },
    { menu_name: "Bands", url: "/bands", icon: "ri-music-line" },
    { menu_name: "Profile", url: "/profile", icon: "ri-user-line" },
    { menu_name: "Users", url: "/users", icon: "ri-team-line" }
  ];

  // ---------------------- BACKEND ----------------------//

  // ---------------------- INTERFACE ----------------------//

  $(window).resize(() => {
    if (window.innerWidth > 768) {
      $("#admin-navbar").removeAttr("style");
    }
  });

  return (
    <aside
      className="bg-slate-950 px-5 pt-5 hidden md:block w-full h-full"
      id="admin-navbar"
    >
      <div className="pb-10">
        <img src={brandLogo} alt="Brand" className="w-32" />
      </div>
      <div>
        <nav>
          <ul className="text-white flex flex-col gap-3">
            {menu.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.url}>
                    <span
                      className={`flex gap-2 text-white py-1 ${
                        mn == item.menu_name
                          ? "bg-blue-700 hover:bg-blue-800"
                          : "hover:bg-slate-800"
                      } px-5 rounded-full duration-300`}
                    >
                      <i className={item.icon}></i>
                      <span className="text-white whitespace-nowrap">
                        {item.menu_name}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminNavbar;
