// service.js
import axios from 'axios';
import { api } from './api';

const API_BASE_URL = 'http://localhost:8081'; 
const API_AUTH_URL = 'http://localhost:8099/api/auth'; 
// Example: POST request to create a user
export const saveUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/saveUser`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Example: GET request to fetch users
export const getUsers = async () => {
  try {
    console.log('in if....');
    const response = await api.get('/getAllUsers');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const authenticate = async (user) => {
  
  try {
   
    const response = await axios.post(`${API_AUTH_URL}/login`,user);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllPolicies = async () => {
  try {
    const response = await api.get('http://localhost:8081/customers/getAllPolicies');
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getClaimsByStatus = async (status, token) => {
  const response = await axios.get(`http://localhost:8081/agents/claims/status/${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateClaimStatus = async (claimId, data, token) => {
  const response = await axios.patch(`http://localhost:8081/agents/${claimId}/updateStatus`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



export const getPoliciesByAgentId = async (agentId, token) => {
  const response = await axios.get(`http://localhost:8081/agents/${agentId}/policies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllPoliciesByCustomerId = async (userId, token) => {
  const response = await axios.get(`http://localhost:8081/customers/getAllPolicies/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



/*export const applyPolicy = async (userId, policyId) => {
  try {
    const response = await api.post(
      `http://localhost:8081/customers/${userId}/applyPolicy/${policyId}`,
      {}, // No request body is needed
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getClaimsByStatus = async (status) => {
  try {
    const response = await api.get(
      `http://localhost:8081/agents/claims/status/${status}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
 
export const getPoliciesByAgentId = async (agentId) => {
  try {
    const response = await api.get(
      `http://localhost:8081/agents/${agentId}/policies`, // Backend endpoint
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateClaimStatus = async (claimId, updateClaimStatusDTO) => {
  try {
    const response = await api.patch(
      `http://localhost:8081/agents/${claimId}/updateStatus`, // Updated backend endpoint
      updateClaimStatusDTO,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};*/