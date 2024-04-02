import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ---------------------------Video------------------------
// =========================Get All Video=========================
export const getAllVideo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/video`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    toast.error(response.data.message);
  }
};

// ----------------------getVideobyId----------------
export const getVideoById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/video/${Id}`, {
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
// ===================Edit Video================D
export const updateVideoById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/video`, formData, {
      headers,
      'Content-Type': 'multipart/form-data',
    });

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

// ------------------------Add Video---------------------
export const AddVideo = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/video`, formData, {
      headers,
    });
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
// ------------------------delete Video---------------------
export const deleteVideo = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/video/${Id}`, {
      headers,
    });
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
