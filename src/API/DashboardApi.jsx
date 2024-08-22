import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const SId = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

// ---------------------------ContactSetting------------------------

// ----------------------getUserDataGraph----------------
// https://vfs.seawindsolution.ae/api/db/dashboard/18
export const getAllDashbaord = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/db/dashboard/${SId}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responsedata;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
