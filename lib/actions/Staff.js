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
  return fetchData('grades', pageIndex, params);
}
export async function getSubjects({ pageIndex, ...params }) {
  return fetchData('subjects', pageIndex, params);
}
export async function getTopics({ pageIndex, ...params }) {
  return fetchData('topics', pageIndex, params);
}
export async function getTopic(id) {
  return fetchItem('topics', id);
}
export async function getObjectives({ pageIndex, ...rest }) {
  const { topicId, subtopicId } = rest;
  return topicId
    ? fetchData('objectives', pageIndex, { topic_id: topicId })
    : fetchData(`objectives`, pageIndex, { subtopic_id: subtopicId });
}
export async function getSubtopics({ pageIndex, ...params }) {
  return fetchData('subtopics', pageIndex, params);
}
export async function getSubtopic(id) {
  return fetchItem('subtopics', id);
}
export async function getDifficultyLevels({ pageIndex, ...params }) {
  return fetchData('difficulty-levels', pageIndex, params);
}
export async function getExamTypes({ pageIndex, ...params }) {
  return fetchData('exam-types', pageIndex, params);
}
export async function getQuestions({ pageIndex, ...params }) {
  return fetchData('questions', pageIndex, params);
}
export async function getObjectivesQuiz({ pageIndex, ...params }) {
  return fetchData('objectives', pageIndex, params);
}
export async function getExamsFull({ pageIndex, ...params }) {
  return fetchData("exams/group-by-subject", pageIndex, params);
}
export async function getSubjectDetails(subject_id) {
  return fetchData("exams", 0, { subject_id });
}
export async function getExamSectionList({ pageIndex, ...rest }) {
  const { exam_id } = rest;
  return fetchData('exams/list-sections', pageIndex, { exam_id });
}
export async function getExamDetails(exam_id) {
  return fetchData("exams/retrieve-exam", 0, { exam_id });
}
export async function getExamCounts(currentPage, searchParams) {
  const api = await createApiClient();
  const url = `/exams/exam-counter`;
  try {
    const response = await api.get(url);
    return response.data.details;
  } catch (error) {
    console.log(error);
  }
}
export async function getQuestionsSections({ pageIndex, ...params }) {
  const api = await createApiClient();
  const queryParams = new URLSearchParams(params).toString();
  const url = `/questions?pageIndex=${pageIndex}&${queryParams}`;
  try {
    const response = await api.get(url);
    return await response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to retrieve questions');
  }
}
export async function retrieveSection(section_id) {
  const api = await createApiClient();
  const url = `/exams/retrieve-section?section_id=${section_id}`;
  try {
    const response = await api.get(url);
    return await response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to retrieve section');
  }
}

//CREATE
export async function createStaff(data) {
  const url = '/auth/create-staff';
  return createItem.call(
    this,
    url,
    'staff',
    data,
    '/staff/usermanagement/staff'
  );
}
export async function createGrade(data) {
  const url = '/grades';
  return createItem.call(this, url, 'grade', data, '/staff/grades');
}
export async function createSubject(data) {
  const url = '/subjects';
  return createItem.call(this, url, 'subject', data, '/staff/subjects');
}
export async function createTopic(data) {
  const url = '/topics';
  return createItem.call(this, url, 'topic', data, '/staff/topics');
}
export async function createObjective(data) {
  const url = '/objectives';
  console.log('data', data);
  return createItem.call(this, url, 'objective', data, '/staff/objectives');
}
export async function createSubtopic(data) {
  const url = '/subtopics';
  return createItem.call(this, url, 'subtopic', data, '/staff/subtopics');
}
export async function createDifficultyLevel(data) {
  const url = '/difficulty-levels';
  return createItem.call(this, url, 'level', data, '/staff/difficulty-levels');
}
export async function createExamType(data) {
  const url = '/exam-types';
  return createItem.call(this, url, 'exam-type', data, '/staff/exam-types');
}
export async function createQuestion(data) {
  const url = '/questions';
  return createItem.call(this, url, 'question', data, '/staff/questions');
}
export async function addSection(newSection) {
  const url = "/exams/add-section";
  const api = await createApiClient(true, newSection);
  try {
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error); // Log full error details
    throw new Error(error.response?.data?.details || 'An unknown error occurred');
  }
}
export async function createExam(newExam) {
  const url = "/exams";
  const api = await createApiClient(true, newExam);
  try {
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error); // Log full error details
    throw new Error(error.response?.data?.details || 'An unknown error occurred');
  }
}
export async function addExamQuestion(newQuestion) {
  const url = "/exams/add-question";
  const api = await createApiClient(true, newQuestion);
  try {
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error); // Log full error details
    throw new Error(error.response?.data?.details || 'An unknown error occurred');
  }
}

//UPDATE
export async function updateStaff(id, data) {
  const url = `/auth/create-staff/${id}`;
  return updateItem.call(
    this,
    url,
    'staff',
    data,
    '/staff/usermanagement/staff'
  );
}

export async function updateGrade(id, data) {
  const url = `/grades/${id}`;
  return updateItem.call(this, url, 'grade', data, '/staff/grades');
}

export async function updateSubject(id, data) {
  const url = `/subjects/${id}`;
  return updateItem.call(this, url, 'subject', data, '/staff/subjects');
}

export async function updateTopic(id, data) {
  const url = `/topics/${id}`;
  return updateItem.call(this, url, 'topic', data, '/staff/topics');
}
export async function updateObjective(id, data) {
  const url = `/objectives/${id}`;
  console.log('data', data);
  return updateItem.call(this, url, 'objective', data, '/staff/subtopics');
}
export async function updateSubtopic(id, data) {
  const url = `/subtopics/${id}`;
  return updateItem.call(this, url, 'subtopic', data, '/staff/subtopics');
}
export async function updateDifficultyLevel(id, data) {
  const url = `/difficulty-levels/${id}`;
  return updateItem.call(this, url, 'level', data, '/staff/difficulty-levels');
}
export async function updateExamType(id, data) {
  const url = `/exam-types/${id}`;
  return updateItem.call(this, url, 'exam-type', data, '/staff/exam-types');
}
export async function updateQuestion(id, data) {
  const url = `/questions/${id}`;
  return updateItem.call(this, url, 'question', data, '/staff/questions');
}
