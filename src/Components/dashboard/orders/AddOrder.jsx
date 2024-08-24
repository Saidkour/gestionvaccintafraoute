import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrder,
  getOrderLoadingSelectore,
} from "../../../redux/slides/orderSlice";
import {
  fetchActiveVaccine,
  getActiveVaccineErrorSelector,
  getActiveVaccineLoadingSelector,
  getActiveVaccineSelector,
} from "../../../redux/slides/vaccineSlice";
export default function AddOrder() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const orderLoading = useSelector(getOrderLoadingSelectore);

  const [order, setOrder] = useState({
    responsibleName: "",
    responsibleLastName: "",
    responsiblePhone: "",
    responsibleIdCard: "",

    childName: "",
    childLastName: "",
    vaccineId: "",
    birthday: "",
    gender: "",

    status: "confirmed",
  });

  useEffect(() => {
    dispatch(fetchActiveVaccine());
  }, [dispatch]);

  const activeVaccineLoading = useSelector(getActiveVaccineLoadingSelector);
  const activeVaccineError = useSelector(getActiveVaccineErrorSelector);
  const activeVaccine = useSelector(getActiveVaccineSelector);

  const validateFrom = useCallback(() => {
    setErrors({});
    let newErrors = {};
    if (!order.responsibleName)
      newErrors.responsibleName = "First name is required";
    if (!order.responsibleLastName)
      newErrors.responsibleLastName = "Second name is required";
    if (!order.responsiblePhone)
      newErrors.responsiblePhone = "Phone is required";
    if (!order.responsibleIdCard)
      newErrors.responsibleIdCard = "CNI is required";
    if (
      !order.birthday ||
      !/^((0?[1-9])|([12][0-9])|(3[01]))[-/.]((0?[1-9])|(1[012]))[-/.](19|20)\d\d$/.test(
        order.birthday
      )
    )
      newErrors.birthday = "Invalid birthday";
    if (!order.childName) newErrors.childName = "Child name is required";
    if (!order.childLastName)
      newErrors.childLastName = "Child Last name is required";
    if (!order.vaccineId) newErrors.vaccineId = "Please select the vaccine";
    if (!order.gender) newErrors.gender = "Gender is required";
    if (!order.status) newErrors.status = "Order status is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  }, [order]);

  const firstRender = useRef(true);
  useEffect(() => {
    setErrors({});
    if (firstRender) {
      firstRender.current = false;
    } else {
      validateFrom();
    }
  }, [
    validateFrom,
    order.responsibleName,
    order.responsibleLastName,
    order.responsiblePhone,
    order.responsibleIdCard,
    order.birthday,
    order.childName,
    order.childLastName,
    order.vaccineId,
    order.gender,
    order.status,
  ]);

  async function handleSubmit(event) {
    event.preventDefault();

    validateFrom();

    if (Object.keys(errors || {})?.length > 0) return;
    if ((await dispatch(addNewOrder(order)))?.payload?.status === "success") {
      setErrors({ success: "Order added" });
      window.scrollTo(0, 0);
      //  setTimeout(() => {
      // setOrder({
      //   responsibleName: "",
      //   responsibleLastName: "",
      //   responsiblePhone: "",
      //   responsibleIdCard: "",
      //
      //   childName: "",
      //   childLastName: "",
      //   vaccineId: "",
      //   birthday: "",
      //   gender: "",
      // });
      // }, 3000);
    } else {
      setErrors({ err: "There was an error" });
      window.scrollTo(0, 0);
    }
  }

  return (
    <div>
      <div className="bg-gray-50  container  lg:py-8 lg:pb-20 px-8 py-8">
        <form className="space-y-4 ">
          {" "}
          {errors?.err && (
            <p className="text-red-500 italic text-sm">{errors.err}</p>
          )}
          {errors?.success && (
            <p className="text-green-500 italic text-sm">{errors.success}</p>
          )}
          <fieldset className="border border-solid border-gray-300 p-3">
            <legend className="px-2 text-primary">Responsible</legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label>First name</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Nom"
                  type="text"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      responsibleName: e.target.value,
                    }))
                  }
                  value={order.responsibleName}
                />
                {errors?.responsibleName && (
                  <p className="text-red-500 italic text-sm">
                    {errors.responsibleName}
                  </p>
                )}
              </div>
              <div>
                <label>Secound name</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Prenom"
                  type="text"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      responsibleLastName: e.target.value,
                    }))
                  }
                  value={order.responsibleLastName}
                />
                {errors?.responsibleLastName && (
                  <p className="text-red-500 italic text-sm">
                    {errors.responsibleLastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label>phone</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="telephone"
                  type="tel"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      responsiblePhone: e.target.value,
                    }))
                  }
                  value={order.responsiblePhone}
                />
                {errors?.responsiblePhone && (
                  <p className="text-red-500 italic text-sm">
                    {errors.responsiblePhone}
                  </p>
                )}
              </div>
              <div>
                <label>CNI</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="CNI"
                  type="text"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      responsibleIdCard: e.target.value,
                    }))
                  }
                  value={order.responsibleIdCard}
                />
                {errors?.responsibleIdCard && (
                  <p className="text-red-500 italic text-sm">
                    {errors.responsibleIdCard}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
          <fieldset className="border border-solid border-gray-300 p-3">
            <legend className="px-2 text-primary">Child</legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label>Child name</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Nom"
                  type="text"
                  onChange={(e) =>
                    setOrder((prev) => ({ ...prev, childName: e.target.value }))
                  }
                  value={order.childName}
                />
                {errors?.childName && (
                  <p className="text-red-500 italic text-sm">
                    {errors.childName}
                  </p>
                )}
              </div>
              <div>
                <label>Child last name</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Prenom"
                  type="text"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      childLastName: e.target.value,
                    }))
                  }
                  value={order.childLastName}
                />
                {errors?.childLastName && (
                  <p className="text-red-500 italic text-sm">
                    {errors.childLastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div>
                <label>gender</label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  onChange={(e) =>
                    setOrder((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={order.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
                {errors?.gender && (
                  <p className="text-red-500 italic text-sm">{errors.gender}</p>
                )}
              </div>
              <div>
                <label>Birthday</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="ex: 31/12/2000"
                  type="text"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      birthday: e.target.value,
                    }))
                  }
                  value={order.birthday}
                />
                {errors?.birthday && (
                  <p className="text-red-500 italic text-sm">
                    {errors.birthday}
                  </p>
                )}
              </div>
              <div>
                <label>type of Vacsan</label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      vaccineId: e.target.value,
                    }))
                  }
                  value={order.vaccineId}
                >
                  <option value="">type of Vacsan</option>
                  {activeVaccine &&
                    activeVaccine.map((vacc) => {
                      return (
                        <option
                          key={vacc.id}
                          value={vacc.id}
                        >{`From ${vacc.startAge} to ${vacc.lastAge} ${vacc.ageType}`}</option>
                      );
                    })}
                </select>
                {errors?.vaccineId && (
                  <p className="text-red-500 italic text-sm">
                    {errors.vaccineId}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
          <div>
            <label htmlFor="status">Order status</label>
            <select
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              name=""
              id=""
              onChange={(e) =>
                setOrder((prev) => ({ ...prev, status: e.target.value }))
              }
              value={order.status}
            >
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="canceled">canceled</option>
              <option value="done">done</option>
            </select>
            {errors?.status && (
              <p className="text-red-500 italic text-sm">{errors.status}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              disabled={orderLoading || Object.keys(errors || {})?.length > 0}
              className="disabled:bg-semi-gray inline-block w-full rounded-lg bg-primary px-5 py-3 font-medium text-white sm:w-auto"
              onClick={handleSubmit}
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
