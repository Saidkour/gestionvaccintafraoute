import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../../redux/slides/orderSlice";
import { pageSelector } from "../../../redux/selectors";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(pageSelector);
  const { showingFrom, showingTo, resultsCount, limit } = useSelector(
    (state) => state.order
  );
  // console.log(currentPage);
  const handleNextPage = () => {
    dispatch(setPage(currentPage + 1));
  };
  const handlePrevPage = () => {
    dispatch(setPage(currentPage - 1));
  };

  return (
    <>
      {showingFrom !== undefined && (
        <div className="flex  flex-col items-center gap-3 mt-5">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing from
            <span className="font-semibold text-gray-900">
              {showingFrom + 1} to
            </span>
            <span className="font-semibold text-gray-900"> {showingTo}</span> of
            <span className="font-semibold text-gray-900">
              {resultsCount}
            </span>{" "}
            Entries
          </span>
          <div className="flex justify-center">
            <button
              disabled={showingFrom === 0}
              onClick={handlePrevPage}
              className={`disabled:opacity-55 flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:textgray-700`}
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </button>
            <button
              disabled={Math.floor(resultsCount / limit + 1) === showingFrom}
              onClick={handleNextPage}
              className={`disabled:opacity-55 flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
