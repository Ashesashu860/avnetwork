import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  blogsReducer,
  usersReducer,
  rootReducer,
  marketPlaceReducer,
  tutorialsReducer,
  queriesReducer,
} from "./reducers";
import { rootSaga } from "./sagas/root_saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    blogs: blogsReducer,
    users: usersReducer,
    root: rootReducer,
    marketPlace: marketPlaceReducer,
    tutorials: tutorialsReducer,
    queries: queriesReducer,
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;
