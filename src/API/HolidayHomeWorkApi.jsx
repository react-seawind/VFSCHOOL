import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ---------------------------HolidayHW------------------------
// =========================Get All HolidayHW=========================
export const getAllHolidayHW = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/holidayhomework`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    toast.error(response.data.message);
  }
};

// ----------------------getHolidayHWbyId----------------
export const getHolidayHWById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/holidayhomework/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ===================Edit HolidayHW================D
export const updateHolidayHWById = async (formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/holidayhomework`,
      formData,
      {
        headers,
        'Content-Type': 'multipart/form-data',
      },
    );

    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ------------------------Add HolidayHW---------------------
export const AddHolidayHW = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/holidayhomework`,
      formData,
      {
        headers,
      },
    );
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------delete HolidayHW---------------------
export const deleteHolidayHW = async (Id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/holidayhomework/${Id}`,
      {
        headers,
      },
    );
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
