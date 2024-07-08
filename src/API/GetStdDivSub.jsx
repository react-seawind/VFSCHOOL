import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const SchoolId = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ---------------------------HomeWork------------------------
// ----------------------getStandardByTeacherId----------------
export const getStandardByTeacherId = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/assign/standard/${SchoolId}`,
    );

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ----------------------getDivisionByStandardId----------------
export const getDivisionByStandardId = async (StandardId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/assign/division/${SchoolId}/${StandardId}`,
    );

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ----------------------getSubjectByDivisionId----------------
export const getSubjectByDivisionId = async (StandardId, DivisionId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/assign/subjects/${SchoolId}/${StandardId}/${DivisionId}`,
    );

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
