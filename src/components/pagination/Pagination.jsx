import React, { Fragment, useEffect, useState } from "react";

const Pagination = ({ totalPage, handleSetPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleSetPage(currentPage);
  }, [currentPage]);

  return (
    <div id="user-list-pagination" className="w-full flex justify-center">
      <div className="flex">
        <div>
          <button
            className="w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:text-white dark:bg-gray-600 dark:border-gray-700"
            onClick={() => setCurrentPage(1)}
          >
            <i className="ri-arrow-left-double-line"></i>
          </button>
        </div>
        <div>
          <button
            className="w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:text-white dark:bg-gray-600 dark:border-gray-700"
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
        </div>
        <div>
          {totalPage === 1 ? (
            <Fragment>
              <div>
                <button
                  className={`w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 bg-blue-500 text-white`}
                >
                  1
                </button>
              </div>
            </Fragment>
          ) : totalPage < 3 ? (
            <Fragment>
              <button
                className={`w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:text-white dark:border-gray-700 ${
                  currentPage === 1
                    ? "bg-blue-500 text-white"
                    : "dark:bg-gray-600"
                }`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={`w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:text-white dark:border-gray-700 ${
                  currentPage === 2
                    ? "bg-blue-500 text-white"
                    : "dark:bg-gray-600"
                }`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                className={`w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:border-gray-700 dark:text-white ${
                  currentPage === 1
                    ? "bg-blue-500 text-white"
                    : "dark:bg-gray-600"
                }`}
                onClick={() =>
                  setCurrentPage(
                    currentPage === 1
                      ? currentPage
                      : currentPage === totalPage
                      ? totalPage - 2
                      : currentPage - 1
                  )
                }
              >
                {currentPage === 1
                  ? currentPage
                  : currentPage === totalPage
                  ? totalPage - 2
                  : currentPage - 1}
              </button>
              <button
                className={`w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:border-gray-700 dark:text-white ${
                  currentPage !== 1 && currentPage !== totalPage
                    ? "bg-blue-500 text-white"
                    : "dark:bg-gray-600"
                }`}
                onClick={() =>
                  setCurrentPage(
                    currentPage === 1
                      ? currentPage + 1
                      : currentPage === totalPage
                      ? totalPage - 1
                      : currentPage
                  )
                }
              >
                {currentPage === 1
                  ? currentPage + 1
                  : currentPage === totalPage
                  ? totalPage - 1
                  : currentPage}
              </button>
              <button
                className={`w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:border-gray-700 dark:text-white ${
                  currentPage === totalPage
                    ? "bg-blue-500 text-white"
                    : "dark:bg-gray-600"
                }`}
                onClick={() =>
                  setCurrentPage(
                    currentPage === 1
                      ? currentPage + 2
                      : currentPage === totalPage
                      ? totalPage
                      : currentPage + 1
                  )
                }
              >
                {currentPage === 1
                  ? currentPage + 2
                  : currentPage === totalPage
                  ? totalPage
                  : currentPage + 1}
              </button>
            </Fragment>
          )}
        </div>
        <div>
          <button
            className="w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:text-white dark:bg-gray-600 dark:border-gray-700"
            onClick={() =>
              setCurrentPage(
                currentPage !== totalPage ? currentPage + 1 : currentPage
              )
            }
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
        <div>
          <button
            className="w-7 h-7 border mx-1 rounded hover:bg-gray-200 duration-300 dark:text-white dark:bg-gray-600 dark:border-gray-700"
            onClick={() => setCurrentPage(totalPage)}
          >
            <i className="ri-arrow-right-double-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
