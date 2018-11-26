import { take, takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects';
import * as actions from './../actions/users';
import * as api from './../api/users'; 

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    console.log(result);
    yield put(actions.getUsersSuccess({
      items: result.data.data,
    }));
  } catch(e) {
    console.log('e', e);
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action, ) {
  try {
    const { firstName, lastName } = action.payload;
    yield call(api.createUser, { firstName, lastName });
    yield call(getUsers);
  } catch (e) {
    console.log('e', e);
  }
}

function* watchCreateUserRequers() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (e) {
    console.log('e', e);
  }
}

function* watchDeleteUserRequest() {
  while(true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, { userId: action.payload.userId });
  }
}

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequers),
  fork(watchDeleteUserRequest),
];

export default usersSagas;
