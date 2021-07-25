export const getDataFromDb = (database) => ({
  type: "GET_DB_DATA",
  database,
});

export const getDataWithIdFromDb = (database, id) => ({
  type: "GET_DB_DATA",
  database,
  id,
});

export const addDatatoDb = (database, data) => ({
  type: "ADD_DB_DATA",
  database,
  data,
});

export const updateDatatoDb = (database, data, id) => ({
  type: "UPDATE_DB_DATA",
  database,
  data,
  id,
});
