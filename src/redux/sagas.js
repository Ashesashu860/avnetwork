import { takeLatest, put } from "redux-saga/effects";
import { signInOutAction } from "./actions";
export function* signInOutSaga(action) {
  yield put(signInOutAction(action.payload));
}

export function* rootSaga() {
  yield takeLatest("SIGN_IN_OUT", signInOutSaga);
}
