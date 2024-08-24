import { useDispatch } from "react-redux";
import { deleteVaccineApi, updateVaccineState } from "../../../api/axios";
import { Arrow } from "../../Home/vacsinCards";
import { useState } from "react";
import { updateVccine, deleteVccine } from "../../../redux/slides/vaccineSlice";
export default function VaccineRow({ item }) {
  const color = item?.available ? " text-gray-400 " : " text-gray-300 ";
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(item?.available);
  const [loading, setLoading] = useState(false);
  const handleChange = () => {
    updateVaccineState(item._id, !checked, setLoading).then((res) => {
      if (res?.status === "success") {
        setChecked(!checked);
        dispatch(updateVccine({ ...item, available: !checked }));
      }
    });
  };

  const handleDelete = () => {
    deleteVaccineApi(item._id, setLoading).then((res) => {
      console.log(res);
      if (res?.status === "success") {
        dispatch(deleteVccine({ id: item._id }));
      }
    });
  };

  return (
    <tr
      className={
        item?.available
          ? "border p-4 font-semibold  text-center "
          : "border p-4 font-semibold  text-center bg-gray-50 " + color
      }
      key={item._id}
    >
      <td className={"border lg:h-20 md:h-20 h-48 p-4 font-semibold  " + color}>
        <div className="flex items-center">
          <span> {`${item.startAge} ${item.ageType?.split("")[0]}`}</span>
          <span className="px-4">
            <Arrow />
          </span>{" "}
          <span> {`${item.lastAge} ${item.ageType?.split("")[0]}`}</span>
        </div>
      </td>
      <td className={"border p-4 font-semibold " + color}>
        {item.description}
      </td>
      <td>
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input
            disabled={loading}
            checked={checked}
            onChange={handleChange}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-50   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
        </label>
      </td>
      <td>
        {!item?.available ? (
          <input
            disabled={loading}
            type="button"
            onClick={handleDelete}
            value={"Supprimer"}
            className="w-10/12 p-2  bg-red-400 disabled:bg-red-200 text-white rounded cursor-pointer hover:bg-red-700 duration-200"
          />
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}
