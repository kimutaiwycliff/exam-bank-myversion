'use server';

import { createApiClient } from "./Auth";

function buildQueryString(params) {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
}

async function fetchData(endpoint, pageIndex, additionalParams = {}) {
  const api = await createApiClient();
  const queryParams = { page: pageIndex + 1, ...additionalParams };
  const queryString = buildQueryString(queryParams);
  console.log("queryString", queryString);
  const response = await api.get(`/${endpoint}?${queryString}`);

  if (!response.status === 200) {
    throw new Error("Failed to fetch data");
  }
  return await response.data;
}

async function fetchItem(endpoint, id) {
  const api = await createApiClient();
  const url = `/${endpoint}/${id}`;
  try {
    const response = await api.get(url);
    return await response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch item');
  }
}

export async function getUsers(userType, pageIndex = 0) {
  return fetchData(`auth`, pageIndex);
}
