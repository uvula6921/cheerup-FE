import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const CHECK_FIRSTLOGIN = "CHECK_FIRSTLOGIN";

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const checkFirstLogin = createAction(CHECK_FIRSTLOGIN, (user) => ({ user }));

const initialState = {
  user: null,
  is_login: false,
  is_firstlogin: false,
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log(
          "리듀서에서 첫번째 로그인 true로 변경",
          draft.is_firstlogin
        );
        draft.is_firstlogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
        draft.is_firstlogin = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [CHECK_FIRSTLOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_firstlogin = false;
      }),
  },
  initialState
);

const actionCreators = {
  logIn,
  getUser,
  logOut,
  checkFirstLogin,
};

export { actionCreators };
