import { useEffect, useState } from "react";
import { addVaccine } from "../../../api/axios";
function AddVacine() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vaccine, setVaccine] = useState({
    name: "",
    dose: "",
    startAge: "",
    lastAge: "",
    description: "",
    gender: "",
    ageType: "",
    available: false,
  });

  useEffect(() => {
    setError({});
  }, [vaccine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errCont = {};
    if (!vaccine.name) {
      errCont.name = "name is required";
    }
    if (!vaccine.dose) {
      errCont.dose = "dose is required";
    }
    if (!vaccine.startAge || isNaN(vaccine.startAge)) {
      errCont.startAge = "Invalid start age";
    }
    if (!vaccine.lastAge || isNaN(vaccine.lastAge)) {
      errCont.lastAge = "Invalid last age";
    }
    if (!vaccine.description) {
      errCont.description = "description is required";
    }
    if (!vaccine.ageType) {
      errCont.ageType = "age type is required";
    }
    if (!vaccine.gender) {
      errCont.gender = "Please select Gender";
    }

    if (Object.keys(errCont).length > 0) {
      setError(errCont);
      return;
    }
    addVaccine(vaccine, setError, setLoading).then((res) => {
      console.log(res);
    });
    setVaccine({
      name: "",
      dose: "",
      startAge: "",
      lastAge: "",
      description: "",
      gender: "",
      ageType: "",
      available: false,
    });
  };
  return (
    <div className="bg-gray-50  container lg:px-40 lg:py-8 lg:pb-20 px-8 py-8">
      <form className="space-y-4 ">
        <h1 className="text-2xl font-semibold">Add Vaccine</h1>
        {error?.err && <p className="text-red-400">{error.err}</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label>name vacine</label>
            <input
              className="w-full focus:border-primary  border-opacity-5  rounded-lg  p-3 text-sm"
              placeholder="Nom"
              type="text"
              value={vaccine.name}
              onChange={(e) => setVaccine({ ...vaccine, name: e.target.value })}
            />
            {error?.name && <p className="text-red-400">{error.name}</p>}
          </div>
          <div>
            <label>dose</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="dose"
              type="text"
              value={vaccine.dose}
              onChange={(e) => setVaccine({ ...vaccine, dose: e.target.value })}
            />
            {error?.dose && <p className="text-red-400">{error.dose}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label>Start age</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Start age"
              type="text"
              value={vaccine.startAge}
              onChange={(e) =>
                setVaccine({ ...vaccine, startAge: e.target.value })
              }
            />
            {error?.startAge && (
              <p className="text-red-400">{error.startAge}</p>
            )}
          </div>
          <div>
            <label>Last age</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder=" Last age"
              type="text"
              value={vaccine.lastAge}
              onChange={(e) =>
                setVaccine({ ...vaccine, lastAge: e.target.value })
              }
            />
            {error?.lastAge && <p className="text-red-400">{error.lastAge}</p>}
          </div>
        </div>
        <div>
          <label>Age type</label>
          <select
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            value={vaccine.ageType}
            onChange={(e) =>
              setVaccine({ ...vaccine, ageType: e.target.value })
            }
          >
            <option value="">select Age type</option>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
          {error?.ageType && <p className="text-red-400">{error.ageType}</p>}
        </div>

        <div className="mb-2">
          <div>
            <label>Description</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Description"
              id="Description"
              type="text"
              value={vaccine.description}
              onChange={(e) =>
                setVaccine({ ...vaccine, description: e.target.value })
              }
            />
            {error?.description && (
              <p className="text-red-400">{error.description}</p>
            )}
          </div>
        </div>

        <div>
          <div>
            <label>gender</label>
            <select
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              value={vaccine.gender}
              onChange={(e) =>
                setVaccine({ ...vaccine, gender: e.target.value })
              }
            >
              <option value="">select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="both">both</option>
            </select>
            {error?.gender && <p className="text-red-400">{error.gender}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            id="avila"
            checked={vaccine?.available}
            onChange={(e) =>
              setVaccine({ ...vaccine, available: e.target.checked })
            }
          />
          <label htmlFor="avila">Is available</label>
        </div>
        <div className="mt-4">
          <button
            disabled={loading || Object.keys(error).length > 0}
            onClick={handleSubmit}
            className="inline-block w-full rounded-lg disabled:bg-blue-300 bg-primary px-5 py-3 font-medium text-white sm:w-auto"
          >
            Add Vaccine
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVacine;
