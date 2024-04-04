import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const SId = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =============================================================================
// ==================================Transportation======================================
// =============================================================================
// =========================Get All Transportation=========================
export const getAllTransportation = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transportation/${SId}`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getTransportationbyId----------------
export const getTransportationById = async (Id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/transportation/${SId}/${Id}`,
      {
        headers,
      },
    );

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
// ===================Edit Transportation================D
export const updateTransportationById = async (formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/transportation`,
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

// ------------------------Add Transportation---------------------
export const AddTransportation = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/transportation`,
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
// ------------------------delete Transportation---------------------
export const deleteTransportation = async (Id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/transportation/${Id}`,
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
