import axios from 'axios';

import { API_BASE_URL, PARTIES, STATUSES } from '../globals/const';

/**
 * Fetches all the settlements from the API
 */
export const fetchSettlements = async () => {
  const response = await axios.get(`${API_BASE_URL}/settlements`);

  return response.data;
};

/**
 * Fetches one settlement item from the API
 */
export const fetchOneSettlement = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/settlements/${id}`);

  return response.data;
};

/**
 * Submits a settlement amount from party A to party B
 *
 * @param {number} amount Monetary amount
 */
export const submitSettlement = async ({ amount }: { amount: number }) => {
  const response = await axios.post(`${API_BASE_URL}/settlements`, {
    party: PARTIES.A,
    status: STATUSES.PENDING,
    amount,
  });

  return response.data;
};

/**
 * Rejects a settlement amount from party B to party A
 *
 * @param {number} amount Monetary amount
 */
export const rejectSettlement = async ({ amount }: { amount: number }) => {
  const response = await axios.post(`${API_BASE_URL}/settlements`, {
    party: PARTIES.B,
    status: STATUSES.REJECTED,
    amount,
  });

  return response.data;
};

/**
 * Accepts a settlement amount from party A to party B
 *
 * @param {number} amount Monetary amount
 */
export const acceptSettlement = async ({ amount }: { amount: number }) => {
  const response = await axios.post(`${API_BASE_URL}/settlements`, {
    party: PARTIES.B,
    status: STATUSES.ACCEPTED,
    amount,
  });

  return response.data;
};

/**
 * Deletes all the settlements from the API
 */
export const deleteAllSettlements = async () => {
  const response = await axios.delete(`${API_BASE_URL}/settlements`);

  return response.data;
};
