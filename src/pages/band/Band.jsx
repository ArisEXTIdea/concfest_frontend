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
  timeConverterNamespace,
  handleDisplayModalConfirm,
  handleDisplayModalPopUp,
  handleToastDisplay
} from "../../utils/global_function";
import axios from "axios";
import { apiHost } from "../../utils/global_variable";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { emptyAnimation } from "../../assets";

const Band = () => {
  // ------------------------- HOOKS ------------------------- //
  const uc = useSelector((state) => state.userCredential);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [bandData, setBandData] = useState([]);
  const [bandSelected, setBandSelected] = useState({});

  useEffect(() => {
    changeTitle("Bands and Artist");
    handleGetBandDataPagination();
  }, [filter]);

  // ------------------------- API ------------------------- //

  const handleGetBandDataPagination = () => {
    axios
      .get(`${apiHost}/band/page/${currentPage}?search=${filter}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        const data = res.data.data;
        setBandData(data.data);
        setTotalPage(data.total_page == 0 ? 1 : data.total_page);
      })
      .catch((err) => {
        handleToastDisplay("red", "ri-close-line", "Failed to get band data!");
      });
  };

  const handleDeleteBand = () => {
    handleDisplayModalConfirm("delete-band", 0);
    axios
      .delete(`${apiHost}/band/delete/${bandSelected["bid"]}`, {
        headers: {
          Authorization: uc
        }
      })
      .then((res) => {
        handleToastDisplay(
          "green",
          "ri-check-line",
          "Success to delete band data!"
        );
        handleGetBandDataPagination();
      })
      .catch((err) => {
        handleToastDisplay(
          "red",
          "ri-close-line",
          "Failed to delete band data!"
        );
      });
  };

  // ------------------------- INTERFACE ------------------------- //

  return (
    <div>
      <ModalConfirm
        name={`delete-band`}
        header="Are you sure to delete this band/artist data?"
        description={`The data you input will be removed and you can't use it to make festival scheduling `}
        confirmBtnText={"Delete"}
        confirmBtnIcon={"ri-delete-bin-line"}
        confirmBtnBackground="bg-slate-100 hover:bg-slate-200"
        confirmBtnTextColor="black"
        onConfirm={handleDeleteBand}
      />
      <ModalPopUp name={"band-detail"} popupHeader={"Detail Band"}>
        <div>
          <div className="bg-slate-700 w-full rounded-lgl">
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Band Name</p>
                <p className="text-white">: {bandSelected.band_name}</p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Logo</p>
                <p className="text-white flex gap-1">
                  :
                  <img
                    src={`${apiHost}/drive/${bandSelected.logo}`}
                    alt="Band Logo"
                    className="w-44"
                  />
                </p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Country</p>
                <p className="text-white">: {bandSelected.country}</p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Wesbite</p>
                <p className="text-white">: {bandSelected.website}</p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Content Add By</p>
                <p className="text-white">
                  : {bandSelected.full_name}{" "}
                  <a href={bandSelected.website} target="_blank">
                    <i className="ri-external-link-line text-blue-500"></i>
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-slate-600">
                <p className="text-white">Created At</p>
                <p className="text-white">
                  :{" "}
                  {timeConverterNamespace.convertEpochToDate(
                    bandSelected.created_at
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
                    bandSelected.updated_at
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalPopUp>
      <AdminWraper mn={"Bands"}>
        <div>
          <div className="px-3 md:px-5 pt-5 pb-5">
            <Pageheader text={"List Band and Artist"} icon={"ri-music-line"} />
          </div>
          <div className="px-3 md:px-5 mb-5">
            <ButtonLinkIcon
              text="Add Band/Artis"
              bgColor="bg-blue-600 hover:bg-blue-500"
              textColor="white"
              iconPosition="l"
              classAdd="rounded shadow-[0px_20px_200px_0px_#f7fafc]"
              type="button"
              icon={"ri-add-line"}
              to="/bands/add-band"
            />
          </div>
          <div>
            <div className="px-3 md:px-5 mb-5">
              <InputSearch
                icon={"ri-search-line"}
                placeholder="Cari band..."
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
                    <th>Logo</th>
                    <th>Band Name</th>
                    <th>Country</th>
                    <th>Website</th>
                    <th>
                      <i className="ri-settings-2-line"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bandData.map((item, index) => {
                    return (
                      <tr
                        className="bg-gray-900 hover:bg-gray-800 duration-300"
                        key={index}
                      >
                        <td className="py-3 text-center">{index + 1}</td>
                        <td>
                          <div className="w-full flex justify-center">
                            <img
                              src={`${apiHost}/drive/${item.logo}`}
                              alt="Band Logo"
                              className="h-10 py-1"
                            />
                          </div>
                        </td>
                        <td>{item.band_name}</td>
                        <td>{item.country}</td>
                        <td className="text-center text-blue-500">
                          <a
                            title="Kunjungi Link"
                            target="_blank"
                            rel="noreferrer"
                            href={item.website}
                          >
                            <i className="ri-external-link-line"></i>
                          </a>
                        </td>
                        <td>
                          <div className="flex gap-5 w-full justify-center">
                            <button
                              onClick={() => {
                                setBandSelected(item);
                                handleDisplayModalPopUp("band-detail", 1);
                              }}
                            >
                              <i className="ri-eye-line hover:text-green-500"></i>
                            </button>
                            <Link to={`/bands/update-band/${item.bid}`}>
                              <i className="ri-pencil-line hover:text-blue-500"></i>
                            </Link>
                            <button
                              onClick={() => {
                                handleDisplayModalConfirm("delete-band", 1);
                                setBandSelected(item);
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
              {bandData.length == 0 ? (
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

export default Band;
