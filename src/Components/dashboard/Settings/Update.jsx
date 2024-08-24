import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserErrorSelectore,
  getUserLoadingSelectore,
  getUserSelectore,
  getUserStatusSelectore,
  updateUser,
} from "../../../redux/slides/userSlice";

export default function Update() {
  const user = useSelector(getUserSelectore);
  const loadingUser = useSelector(getUserLoadingSelectore);
  const userError = useSelector(getUserErrorSelectore);
  const userStatus = useSelector(getUserStatusSelectore);

  const dispatch = useDispatch();

  const [validationError, setValidationError] = useState({});

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123");

  useEffect(() => {
    setName(user?.name || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
  }, [user?.name, user?.lastName, user?.email]);

  useEffect(() => {
    if (userError?.message.includes("401")) {
      setValidationError({ response: "Invalide password" });
    }
  }, [userError?.message]);
  function handleClick(e) {
    e.preventDefault();
    let error = {};
    if (
      name === user.name &&
      lastName === user.lastName &&
      email === user.email
    ) {
      error.response = "No data updated!";
    }
    if (!name) {
      error.name = "Please enter your name";
    }
    if (!lastName) {
      error.lastName = "Please enter your last name";
    }
    if (!email) {
      error.email = "Please enter a email";
    }
    if (!password) {
      error.password = "Please enter a password";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.email = "Please enter a valid email";
    }

    if (Object.keys(error).length > 0) return setValidationError(error);
    setValidationError({});
    dispatch(
      updateUser({ name, lastName, email, password }, setValidationError)
    );
  }
  useEffect(() => {
    setValidationError((prev) => ({ ...prev, success: userStatus }));
  }, [userStatus]);

  useEffect(() => {
    setValidationError({});
  }, [name, email, password, lastName]);

  return (
    <form className="space-y-4">
      {validationError?.response && (
        <p className="text-red-500 text-xs italic">
          {validationError.response}
        </p>
      )}
      {validationError?.success && (
        <p className="text-green-500 text-xs italic">
          {validationError.success}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label>First name</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Nom"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationError?.name && (
            <p className="text-red-500 text-xs italic">
              {validationError.name}
            </p>
          )}
        </div>
        <div>
          <label>Last name</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Prenom"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {validationError?.lastName && (
            <p className="text-red-500 text-xs italic">
              {validationError.lastName}
            </p>
          )}
        </div>
      </div>
      <div>
        <label>Email</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationError?.email && (
          <p className="text-red-500 text-xs italic">{validationError.email}</p>
        )}
      </div>
      <div>
        <label>Current Password</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {validationError?.password && (
          <p className="text-red-500 text-xs italic">
            {validationError.password}
          </p>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={handleClick}
          disabled={loadingUser}
          className="disabled:bg-semi-gray inline-block w-full rounded-lg bg-primary px-5 py-3 font-medium text-white sm:w-auto hover:bg-semi-gray"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
