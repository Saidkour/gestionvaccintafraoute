import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  fetchActiveVaccine,
  getActiveVaccineSelector,
} from "../../redux/slides/vaccineSlice";

export default function Vacsins() {
  const activeVaccines = useSelector(getActiveVaccineSelector);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchActiveVaccine());
  // }, [dispatch]);
  console.log(activeVaccines);

  return (
    <>
      <div className=" container w-full p-6 relative  flex-col border-b  mb-4 ">
        <div className="xl:w-4/12 md:w-4/12 w-10/12 text-center m-auto p-4">
          <p className="text-xl font-light space-x-10 text-primary">
            vaccinez vos enfants
          </p>
          <div className="w-3/12 h-2 opacity-15 bg-primary m-auto mt-6 rounded"></div>
          <div className="w-2/12 h-2 opacity-15 bg-primary m-auto mt-4 rounded"></div>
          <div className="w-1/12 h-2 opacity-15 bg-primary m-auto mt-4 rounded"></div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 grid-cols-1  md:grid-cols-3 xl:grid-cols-4 w-full mt-8 ">
          {Object.keys(activeVaccines).length > 0 &&
            activeVaccines.map((item) => {
              return <Cards item={item} key={item.id} />;
            })}
        </div>
      </div>
    </>
  );
}

const Cards = ({ item }) => {
  return (
    <>
      <div className="shadow flex-col rounded p-6 bg-slate-100 hover:scale-105 duration-500 ease-in-out">
        <div className="border-b text-center flex justify-center w-full">
          <h1 className="flex justify-between md:w-8/12 xl:w-8/12 w-full font-bold">
            {item.startAge}
            <span>
              <Arrow />
            </span>
            {item.lastAge}
            <span>{item.ageType}</span>
          </h1>
        </div>
        <div className="text-center  mt-6 text-gray-400 ">
          {item.description}
        </div>
        <div className="text-center mt-14 w-full relative ">
          <Link
            to={`vacsin/${item.id}`}
            className=" text-center absolute left-0 right-0 bottom-0 w-full shadow  bg-semi-gray  xl:text-[13px] md:text-[13px]  text-white font-medium p-2 rounded hover:bg-slate-100 hover:text-semi-gray hover:border hover:border-semi-gray transition duration-500 ease-in-out"
          >
            envoyez le dommande
          </Link>
        </div>
      </div>
    </>
  );
};

export const Arrow = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className=" w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    </>
  );
};
