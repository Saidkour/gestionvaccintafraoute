import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
export default axios;

export async function getOrders(page, limit, cin = "", status = "") {
  try {
    const response = await axios.get(
      `/order?page=${page}&limit=${limit}&responsibleIdCard=${cin}&status=${status}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getVaccines() {
  try {
    const response = await axios.get("/vaccine");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateVaccineState(id, available, setLoading) {
  try {
    setLoading(true);
    const response = await axios.patch(`/vaccine/${id}`, { available });
    return response.data;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

export async function deleteVaccineApi(id, setLoading) {
  try {
    setLoading(true);
    const response = await axios.delete(`/vaccine/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

export async function addOrder(order, setError, setLoading) {
  console.log("axios: ", order);
}
export async function updateOrderState(id, status, setLoading) {
  try {
    setLoading(true);
    const response = await axios.patch(`/order/${id}`, { status });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

export async function addVaccine(vaccine, setError, setLoading) {
  try {
    setLoading(true);
    const response = await axios.post("/vaccine", vaccine);
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setError((prev) => ({ ...prev, err: "All fields are required" }));
          break;
        case 401:
          setError((prev) => ({ ...prev, err: "Please check your Inputs" }));
          break;
        case 403:
          setError((prev) => ({ ...prev, err: "You are not authorized" }));
          break;

        default:
          setError("An error occurred, Please try again later");
          break;
      }
    } else {
      setError((prev) => ({
        ...prev,
        err: "An error occurred, Please try again later",
      }));
    }
    console.error(error);
  } finally {
    setLoading(false);
  }
}

export async function login(role, email, password, setError) {
  try {
    const response = await axios.post("/user/login", { role, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setError((prev) => ({ ...prev, err: "All fields are required" }));
          break;
        case 401:
          setError((prev) => ({ ...prev, err: "Invalide email or password" }));
          break;
        case 403:
          setError((prev) => ({ ...prev, err: "You are not authorized" }));
          break;

        default:
          setError("An error occurred, Please try again later");
          break;
      }
    } else {
      setError((prev) => ({
        ...prev,
        err: "An error occurred, Please try again later",
      }));
    }
    console.error(error);
  }
}

export async function forgetPass(email, setError, setLoading) {
  try {
    setLoading(true);
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email" }));
    }
    console.log(await axios.post("/user/resetPassword", { email }));
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setError((prev) => ({ ...prev, err: "All fields are required" }));
          break;
        case 401:
          setError((prev) => ({
            ...prev,
            err: "No such user with this email",
          }));
          break;
        case 403:
          setError((prev) => ({ ...prev, err: "You are not authorized" }));
          break;

        default:
          setError("An error occurred, Please try again later");
          break;
      }
    } else {
      setError((prev) => ({
        ...prev,
        err: "An error occurred, Please try again later",
      }));
    }
    console.error(error);
  } finally {
    setLoading(false);
  }
}
