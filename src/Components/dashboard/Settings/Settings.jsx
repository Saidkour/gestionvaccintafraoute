import { useState } from "react";
import ChangePassword from "./ChangePassword";
import Update from "./update";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("update");

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <h1 className="text-2xl m-4">Settings</h1>
      <hr />
      <div className="flex justify-between">
        <div className="m-4">
          <h2 className="text-xl mb-4">Profile</h2>
          <p>View and update your account details</p>
        </div>
      </div>
      <div className="flex pb-4">
        <button
          disabled={activeSection === "update"}
          className={`disabled:bg-semi-gray w-full px-4 py-2 border bg-primary text-center text-white  hover:bg-semi-gray`}
          onClick={() => handleButtonClick("update")}
        >
          Update Information
        </button>
        <button
          disabled={activeSection === "changePassword"}
          className={`disabled:bg-semi-gray w-full px-4 py-2 border bg-primary  text-center text-white hover:bg-semi-gray`}
          onClick={() => handleButtonClick("changePassword")}
        >
          Change Password
        </button>
      </div>

      <div className="bg-gray-50 container lg:px-40 lg:py-8 lg:pb-20 px-8 py-8">
        {activeSection === "update" ? (
          <Update />
        ) : activeSection === "changePassword" ? (
          <ChangePassword />
        ) : null}
      </div>
    </>
  );
}
