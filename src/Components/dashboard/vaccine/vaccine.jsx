import { useEffect, useState } from "react";
import { Arrow } from "../../Home/vacsinCards";
import TitleTable from "../titleTable";
import VaccineRow from "./vaccineRow";
import { useDispatch, useSelector } from "react-redux";
import { vaccineSelector } from "../../../redux/selectors";
import { addVaccines } from "../../../redux/slides/vaccineSlice";
import { addVaccine, getVaccines } from "../../../api/axios";
import TableWrapper from "../TableWrapper";

export default function Vaccine() {
  const dispatch = useDispatch();

  const vaccines = useSelector(vaccineSelector);

  useEffect(() => {
    getVaccines().then(
      (res) => dispatch(addVaccines(res.vaccines)) && console.log(res.vaccines)
    );
  }, [dispatch]);

  return (
    <>
      <TitleTable>la list des vaccines</TitleTable>

      <div className=" lg:w-10/12 md:w-10/12 w-full">
        <TableWrapper>
          <table className="table-auto border-collapse border mt-3  w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className=" text-start border p-3 w-2/12">Age</th>
                <th className=" text-start border p-3 w-4/12">description</th>
                <th className="  border p-3 w-1/12">avaliable</th>
                <th className="  border p-3 w-1/12">suppression</th>
              </tr>
            </thead>
            <tbody>{vaccines?.length > 0 && <Tbody list={vaccines} />}</tbody>
          </table>
        </TableWrapper>
      </div>
    </>
  );
}

const Tbody = ({ list }) => {
  return list.map((item) => <VaccineRow item={item} key={item?._id} />);
};
