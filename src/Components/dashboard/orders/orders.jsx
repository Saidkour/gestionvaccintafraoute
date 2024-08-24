import { useEffect, useState } from "react";
import TitleTable from "../titleTable";
import OrderItem from "./orderItem";
import { getOrders } from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { addOrders } from "../../../redux/slides/orderSlice";
import {
  limitSelector,
  orderSelector,
  pageSelector,
} from "../../../redux/selectors";
import Pagination from "./pagination";
import TableWrapper from "../TableWrapper";
import { fetchUser, getUserSelectore } from "../../../redux/slides/userSlice";

const Orders = () => {
  const dispatch = useDispatch();

  const [cin, setCin] = useState("");
  const [filter, setFilter] = useState("");

  const storeOrders = useSelector(orderSelector);
  const page = useSelector(pageSelector);
  const limit = useSelector(limitSelector);

  useEffect(() => {
    if (cin || cin.length != 0) return;
    getOrders(page, limit).then((res) => dispatch(addOrders(res)));
  }, [dispatch, page, limit, cin]);

  useEffect(() => {
    getOrders(page, limit, cin, filter).then((res) => dispatch(addOrders(res)));
  }, [filter, dispatch, page, limit, cin]);

 
  return (
    <>
      <div>
        <div className="flex flex-col  ">
          {/* search bar with select */}
          <div className="my-2">
            <div className="flex justify-between">
              <select
                id="status"
                name="status"
                className="shadow-sm border p-2 block w-40 sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">confirmed</option>
                <option value="canceled">Cancelled</option>
                <option value="done">Done</option>
              </select>
              <div className="flex">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="shadow-sm p-2 border rounded-e-none w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="CIN"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                />
              </div>
            </div>
          </div>
          <TitleTable> la list des order</TitleTable>
          <TableWrapper>
            <table className="min-w-full divide-y  divide-gray-200 border">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Responsible</Th>
                  <Th>patient</Th>
                  <Th>STATUS</Th>
                  <Th>DATE</Th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border-1">
                {storeOrders?.length > 0 &&
                  storeOrders.map((order, index) => (
                    <OrderItem key={order._id} item={order} />
                  ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>
        <Pagination />
      </div>
    </>
  );
};

const Th = ({ children }) => {
  return (
    <>
      <th className="px-6 py-3 text-left border text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    </>
  );
};

export default Orders;
