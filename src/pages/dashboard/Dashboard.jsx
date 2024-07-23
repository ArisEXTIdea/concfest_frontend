import React, { Fragment, useEffect, useState } from "react";
import { AdminWraper, ButtonIcon, ButtonLinkIcon } from "../../components";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import { handleToastDisplay } from "../../utils/global_function";

const Dashboard = () => {
  // ---------------------  HOOKS ---------------------//
  const uc = useSelector((state) => state.userCredential);
  const [eventResumeData, setEventResumeData] = useState({});
  const [bandResumeData, setBandResumeData] = useState({});

  useEffect(() => {
    handleGetEventResume();
    handleGetbandResume();
  }, []);

  // ---------------------  API ---------------------//

  const handleGetEventResume = () => {
    axios
      .get(`${apiHost}/event/resume`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        const data = res.data.data;
        setEventResumeData(data);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get event data!");
      });
  };

  const handleGetbandResume = () => {
    axios
      .get(`${apiHost}/band/resume`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        const data = res.data.data;
        setBandResumeData(data);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get band data!");
      });
  };

  // ---------------------  INTERFACE ---------------------//

  return (
    <Fragment>
      <AdminWraper mn="Dashboard">
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <div>
            <h1 className="text-white">Selamat Datangg di Concfest Web App</h1>
          </div>
          <div className="flex gap-2">
            <ButtonLinkIcon
              to={"/bands"}
              text={`Band Listed: ${bandResumeData?.total_band}`}
              bgColor="bg-green-600 hover:bg-green-500"
              textColor="white"
              iconPosition="l"
              classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
              type="button"
              icon={"ri-music-line"}
            />
            <ButtonLinkIcon
              to={"/event"}
              text={`Events Scheduled : ${eventResumeData?.total_event}`}
              bgColor="bg-blue-600 hover:bg-blue-500"
              textColor="white"
              iconPosition="l"
              classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
              type="button"
              icon={"ri-music-line"}
            />
          </div>
        </div>
      </AdminWraper>
    </Fragment>
  );
};

export default Dashboard;
