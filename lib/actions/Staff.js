'use server';

import { revalidatePath } from 'next/cache';
import { createApiClient } from './Auth';

function buildQueryString(params) {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&');
}

const fetchData = async (endpoint, pageIndex, additionalParams = {}) => {
  const api = await createApiClient();
  const queryParams = { page: pageIndex + 1, ...additionalParams };
  const queryString = buildQueryString(queryParams);
  console.log('queryString', queryString);
  const response = await api.get(`/${endpoint}?${queryString}`);

  if (!response.status === 200) {
    throw new Error('Failed to fetch data');
  }
  return await response.data;
};

const fetchItem = async (endpoint, id) => {
  const api = await createApiClient();
  const url = `/${endpoint}/${id}`;
  try {
    const response = await api.get(url);
    return await response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch item');
  }
};

const createItem = async (url, label, data, pathToRevalidate) => {
  try {
    const api = await createApiClient(true, data);
    const response = await api.post(url);
    if (!response.status === 200) {
      throw new Error(`Failed to create ${label}`);
    }

    revalidatePath(pathToRevalidate);
    return true; // Indicate success
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
  }
};

const updateItem = async (url, label, data, pathToRevalidate) => {
  try {
    const api = await createApiClient(true, data);
    const response = await api.put(url);
    if (!response.status === 200) {
      throw new Error(`Failed to update ${label}`);
    }

    revalidatePath(pathToRevalidate);
    return true; // Indicate success
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
  }
};

//FETCH
export const getUsers = async (userType, pageIndex = 0) => {
  return fetchData(`auth`, pageIndex);
};
export async function getGrades({ pageIndex, ...params }) {
  return fetchData("grades", pageIndex, params);
}
export async function getSubjects({ pageIndex, ...params }) {
  return fetchData("subjects", pageIndex, params);
}
export async function getTopics({ pageIndex, ...params }) {
  return fetchData("topics", pageIndex, params);
}
export async function getTopic(id) {
  return fetchItem("topics", id);
}
export async function getObjectives({ pageIndex, ...rest }) {
  const { topicId, subtopicId } = rest;
  return topicId
    ? fetchData("objectives", pageIndex, { topic_id: topicId })
    : fetchData(`objectives`, pageIndex, { subtopic_id: subtopicId });
}

//CREATE
export async function createStaff(data) {
  const url = "/auth/create-staff";
  return createItem.call(
    this,
    url,
    "staff",
    data,
    "/staff/usermanagement/staff"
  );
}
export async function createGrade(data) {
  const url = "/grades";
  return createItem.call(this, url, "grade", data, "/staff/grades");
}
export async function createSubject(data) {
  const url = "/subjects";
  return createItem.call(this, url, "subject", data, "/staff/subjects");
}
export async function createTopic(data) {
  const url = "/topics";
  return createItem.call(this, url, "topic", data, "/staff/topics");
}
export async function createObjective(data) {
  const url = "/objectives";
  console.log("data", data);
  return createItem.call(this, url, "objective", data, "/staff/objectives");
}


//UPDATE
export async function updateStaff(id, data) {
  const url = `/auth/create-staff/${id}`;
  return updateItem.call(
    this,
    url,
    "staff",
    data,
    "/staff/usermanagement/staff"
  );
}

export async function updateGrade(id, data) {
  const url = `/grades/${id}`;
  return updateItem.call(this, url, "grade", data, "/staff/grades");
}

export async function updateSubject(id, data) {
  const url = `/subjects/${id}`;
  return updateItem.call(this, url, "subject", data, "/staff/subjects");
}

export async function updateTopic(id, data) {
  const url = `/topics/${id}`;
  return updateItem.call(this, url, "topic", data, "/staff/topics");
}
export async function updateObjective(id, data) {
  const url = `/objectives/${id}`;
  console.log("data", data);
  return updateItem.call(this, url, "objective", data, "/staff/subtopics");
}
