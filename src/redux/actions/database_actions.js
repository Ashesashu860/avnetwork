export const getDataFromDb = (database) => ({
  type: "GET_DB_DATA",
  payload: {
    database,
  },
});

export const getDataWithIdFromDb = (database, id) => ({
  type: "GET_DB_DATA",
  payload: {
    database,
    id,
  },
});

export const addDatatoDb = (database, data, id) => ({
  type: "ADD_DB_DATA",
  payload: {
    database,
    data,
    id,
  },
});

export const updateDatatoDb = (database, data, id) => ({
  type: "UPDATE_DB_DATA",
  payload: {
    database,
    data,
    id,
  },
});

export const deleteDataFromDb = (database, id) => ({
  type: "DELETE_DB_DATA",
  payload: {
    database,
    id,
  },
});
