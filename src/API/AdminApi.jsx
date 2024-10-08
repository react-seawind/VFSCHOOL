import axios from 'axios';
import Config from './Config';
import { toast } from 'react-toastify';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =========================AdminLogin==============D
export const AdminLogin = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/adminLogin`, data);
    if (response.data.responseData.ThisAdmin === 'Teacher') {
      toast.error('Invalid Username / Password');
    } else if (response.data.status === true) {
      const { Id, token } = response.data.responseData;
      const schoollogindata = { Id, token };
      sessionStorage.setItem(
        'schoollogindata',
        JSON.stringify(schoollogindata),
      );
      toast('Login Successfully');
      return response;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ======================PROFILE===========================
// =========================getAdmindata=========================D
export const getAdmindataById = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ===================ChangePassword================D
export const ChangePassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/ChangePassword`,
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
