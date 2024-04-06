import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const SId = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =========================Get All Teacher=========================
export const getAllTeacher = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teacher/${SId}`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getTeacherbyId----------------
export const getTeacherById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teacher/${SId}/${Id}`, {
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
// ===================Edit Teacher================D
export const updateTeacherById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/teacher`, formData, {
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

// ------------------------Add Teacher---------------------
export const AddTeacher = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teacher`, formData, {
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
// ------------------------delete Teacher---------------------
export const deleteTeacher = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/teacher/${Id}`, {
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
export const TeacherChangePassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/teacher/changePassword`,
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

// =========================Get All Teacher=========================
export const getAllTeacherAssign = async (Id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/teacher/assign/${SId}/${Id}`,
      {
        headers,
      },
    );
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
// ------------------------delete Teacher---------------------
export const deleteTeacherAssign = async (Id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/teacher/assign/${Id}`,
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

// ------------------------Add Teacher---------------------
export const AddTeacherAssign = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/teacher/assign`,
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
