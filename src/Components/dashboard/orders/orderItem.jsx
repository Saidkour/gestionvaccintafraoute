import { useEffect, useState } from "react";
import { updateOrderState } from "../../../api/axios";

const OrderItem = ({ item }) => {
  const [status, setStatus] = useState(item.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === item.status) return;
    updateOrderState(item._id, status, setLoading);
  }, [status, item._id, item.status]);

  return (
    <>
      <tr>
        <Td>
          <p className="mb-1 text-[11px] sm:text-sm md:text-[16px]">
            name: <strong> {item.responsibleName}</strong>
          </p>
          <p className="mb-1 text-[11px] sm:text-sm md:text-[16px]">
            cin: <strong>{item.responsibleIdCard}</strong>
          </p>
          <p className="mb-1 text-[11px] sm:text-sm md:text-[16px]">
            phone: <strong>{item.responsiblePhone}</strong>
          </p>
        </Td>

        <Td>
          <p className="mb-1 text-[11px] sm:text-sm md:text-[16px]">
            patient: <strong>{item.childName || item.childLastName}</strong>
          </p>
          <p className="mb-1 text-[11px] sm:text-sm md:text-[16px]">
            gender: <strong>{item.gender}</strong>
          </p>
          <p className="mb-1 text-[11px] sm:text-sm md:text-[16px]">
            vaccine:{" "}
            <strong>
              {item.vaccineId &&
                `${item.vaccineId?.startAge}-${item.vaccineId?.lastAge} ${item.vaccineId?.ageType}`}
            </strong>
          </p>
        </Td>

        <td className="px-2 py-2 whitespace-nowrap border ">
          <div className="mb-1 text-[11px] sm:text-sm md:text-[16px] text-gray-900 flex flex-col items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={
                status === "done"
                  ? "text-green-500"
                  : status === "canceled"
                  ? "text-red-500"
                  : status === "confirmed"
                  ? "text-blue-500"
                  : "text-gray-500"
              }
              disabled={loading}
            >
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="canceled">canceled</option>
              <option value="done">done</option>
            </select>
          </div>
        </td>

        <td className="px-2 py-2 whitespace-nowrap border ">
          <div className="mb-1 text-[11px] sm:text-sm md:text-[16px] text-gray-900 flex flex-col items-center">
            {item.createdAt}
          </div>
        </td>
      </tr>
    </>
  );
};
const Td = ({ children }) => {
  return (
    <>
      <td className="px-2 py-2 whitespace-nowrap border ">
        <div className="text-[13px] text-gray-900 flex flex-col items-start">
          {children}
        </div>
      </td>
    </>
  );
};
export default OrderItem;
