import axios from 'axios';

import { API_BASE_URL } from '../globals/const';

/**
 * Fetches all the settlements from the API
 */
export const fetchSettlements = async () => {
  const response = await axios.get(`${API_BASE_URL}/settlements`);

  return response.data;
};

/**
 * Submits a settlement amount from party A to party B
 *
 * @param {number} amount Monetary amount
 * @param {string} message A message to send with the submission
 */
export const submitSettlement = async ({
  amount,
  message,
}: {
  amount: number;
  message: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/settlements`, {
    party: 'a',
    status: 'pending',
    amount,
    message,
  });

  return response.data;
};

/**
 * Rejects a settlement amount from party B to party A
 *
 * @param {number} amount Monetary amount
 * @param {string} message A message to send with the submission
 */
export const rejectSettlement = async ({
  amount,
  message,
}: {
  amount: number;
  message: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/settlements`, {
    party: 'b',
    status: 'rejected',
    amount,
    message,
  });

  return response.data;
};

/**
 * Accepts a settlement amount from party A to party B
 *
 * @param {number} amount Monetary amount
 * @param {string} message A message to send with the submission
 */
export const acceptSettlement = async ({
  amount,
  message,
}: {
  amount: number;
  message: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/settlements`, {
    party: 'b',
    status: 'accepted',
    amount,
    message,
  });

  return response.data;
};
