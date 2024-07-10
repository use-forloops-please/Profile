import axios from 'axios';

const BASE_URL = 'https://localhost:7075/api';

export const getAbout = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/About`);
    return response;
  } catch (error) {
    console.error('Error fetching about data', error);
    throw error;
  }
};

export const updateAbout = async (updatedData) => {
  try {
    console.log('Sending data to API:', updatedData);
    const response = await axios.put(`${BASE_URL}/About`, {
      id: updatedData.id,
      aboutText: updatedData.aboutText
    });
    return response;
  } catch (error) {
    console.error('Error updating about data', error);
    throw error;
  }
};

export const getContact = () => axios.get(`${BASE_URL}/Contact`);
export const updateContact = (data) => axios.put(`${BASE_URL}/Contact`, data);

export const getHeader = () => axios.get(`${BASE_URL}/Header`);
export const updateHeader = (data) => axios.put(`${BASE_URL}/Header`, data);

export const getSkills = () => axios.get(`${BASE_URL}/Skills`);
export const updateSkills = (data) => axios.put(`${BASE_URL}/Skills`, data);

export const getProjects = () => axios.get(`${BASE_URL}/Project`);
export const updateProjects = (data) => axios.put(`${BASE_URL}/Project`, data);

export default {
  getAbout,
  updateAbout,
  getContact,
  updateContact,
  getHeader,
  updateHeader,
  getSkills,
  updateSkills,
  getProjects,
  updateProjects
};
