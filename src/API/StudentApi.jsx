import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const SId = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =========================Get All Student=========================
export const getAllStudent = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student/${SId}`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
// =========================get All Student Inquiry=========================
export const getAllStudentInquiry = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contact/${SId}`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getStudentbyId----------------
export const getStudentById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student/${SId}/${Id}`, {
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
// ===================Edit Student================D
export const updateStudentById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/student`, formData, {
      headers,
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

// ------------------------Add Student---------------------
export const AddStudent = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/student`, formData, {
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
// ------------------------delete Student---------------------
export const deleteStudent = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/student/${Id}`, {
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
// ===================ChangePassword================D
export const StudentChangePassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/student/changePassword`,
      data,
      {
        headers,
      },
    );

    if (response.data.status === true) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
