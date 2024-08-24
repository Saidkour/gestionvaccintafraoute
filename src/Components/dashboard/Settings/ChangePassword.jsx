import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserErrorSelectore,
  getUserLoadingSelectore,
  getUserStatusSelectore,
  updateUser,
} from "../../../redux/slides/userSlice";

export default function ChangePassword() {
  const loadingUser = useSelector(getUserLoadingSelectore);
  const errorUser = useSelector(getUserErrorSelectore);
  const userStatus = useSelector(getUserStatusSelectore);

  const dispatch = useDispatch();

  const [validationError, setValidationError] = useState({});
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const err = {};
    if (!password) {
      err.password = "Please enter your password";
    }

    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        newPassword
      )
    ) {
      err.newPassword =
        "Password must contain at least 8 characters, including UPPER/lowercase and numbers";
    }

    if (newPasswordConfirm !== newPassword) {
      err.newPasswordConfirm = "The confirmation don't match the password";
    }

    if (Object.keys(err).length !== 0) {
      return setValidationError(err);
    }

    dispatch(updateUser({ password, newPassword }));
  };

  useEffect(() => {
    setValidationError((prev) => ({ ...prev, success: userStatus }));
  }, [userStatus]);

  useEffect(() => {
    setValidationError({});
  }, [newPasswordConfirm, password, newPassword]);

  return (
    <form className="space-y-4">
      {validationError?.success && (
        <p className="text-green-500 text-xs italic">
          {validationError.success}
        </p>
      )}
      <div>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Current Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {validationError?.password && (
          <p className="text-red-500 mt-2 text-xs italic">
            {validationError.password}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="newPassword">New Password</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {validationError?.newPassword && (
          <p className="text-red-500 mt-2 text-xs italic">
            {validationError.newPassword}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Confirm New Password"
          type="password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
        {validationError?.newPasswordConfirm && (
          <p className="text-red-500 mt-2 text-xs italic">
            {validationError.newPasswordConfirm}
          </p>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={handleClick}
          disabled={loadingUser}
          className="disabled:bg-semi-gray inline-block w-full rounded-lg bg-primary px-5 py-3 font-medium text-white sm:w-auto hover:bg-semi-gray"
        >
          Change Password
        </button>
      </div>
    </form>
  );
}
