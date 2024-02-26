import axios from 'axios';

const API_BASE_URL = 'https://seawindsolution.ae/node-app-change';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHN3cy5jb20iLCJpZCI6MSwiaWF0IjoxNzA2MTc2MDQ2LCJleHAiOjE3MDYyNjI0NDZ9.LU6tRzYmtraIKIEObRCs9db4EfKwqUCUcbKet82TETA';

// =========================SERVICE=========================
export const getServicedata = async () => {
  try {
    const headers = {
      'x-api-key': '123456789123456789',
      authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.get(`${API_BASE_URL}/getSlider`, {
      headers,
    });
    return response.data.ResponseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// =========================BLOG=========================
export const getBlog = async () => {
  try {
    const headers = {
      'x-api-key': '123456789123456789',
      authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.get(`${API_BASE_URL}/getBlog`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const AddBlog = async (formData) => {
  try {
    const headers = {
      'x-api-key': '123456789123456789',
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.post(`${API_BASE_URL}/addBlog`, formData, {
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// ====================NEW=======================

// import axios from 'axios';
// import { toast } from 'react-toastify';

// const API_BASE_URL = 'https://seawindsolution.ae/node-app/api-new';

// const sessiondata = sessionStorage.getItem('logindata');
// const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
// const token = parsedSessionData ? parsedSessionData.token : null;
// const Id = parsedSessionData ? parsedSessionData.Id : null;

// const TOKEN = token;

// const headers = {
//   authorization: `Bareer ${TOKEN}`,
// };

// // =========================AdminLogin==============
// export const AdminLogin = async (data) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/adminLogin`, data);
//     if (response.data.status == true) {
//       sessionStorage.setItem(
//         'logindata',
//         JSON.stringify(response.data.responseData),
//       );
//       toast('Login Successfully');
//     } else {
//       toast(response.data.message);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// // ======================PROFILE===========================
// // =========================getAdmindata=========================
// export const getAdmindataById = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/admin/${Id}`, {
//       headers,
//     });

//     if (response.data.status === true) {
//       return response.data;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// // ===================Edit Admin data================
// export const UpdateAdminById = async (formData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/admin`, formData, {
//       headers,
//       'Content-Type': 'multipart/form-data',
//     });

//     if (response.data.status === true) {
//       return response.data;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// // =========================SERVICE=========================
// export const getServicedata = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/getSlider`, {
//       headers,
//     });

//     if (response.data.status == true) {
//       return response.data.ResponseData;
//     } else {
//       toast(response.data.message);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
// // =========================BLOG=========================
// export const getBlog = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/getBlog`, {
//       headers,
//     });
//     return response.data.responsedata;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
// export const AddBlog = async (formData) => {
//   try {
//     const headers = {
//       'x-api-key': '123456789123456789',
//       'Content-Type': 'multipart/form-data',
//       authorization: `Bearer ${TOKEN}`,
//     };
//     const response = await axios.post(`${API_BASE_URL}/addBlog`, formData, {
//       headers,
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
