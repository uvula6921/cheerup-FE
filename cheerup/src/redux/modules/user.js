import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import instance from "../../shared/Request";

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

const loginSV = (_id, pwd) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/user/login", {
        username: _id,
        password: pwd,
      })
      .then((res) => {
        console.log("로그인이 성공했습니다.", res);
        instance.get("/user/session").then((response) => {
          console.log(response);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const signupSV = (id, pwd, pwdcheck) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/signup", {
        username: id,
        password: pwd,
        passwordChecker: pwdcheck,
      })
      .then((res) => {
        console.log(res);
        //굳이 회원가입 후 바로 로그인하도록 하는것은 필요시 구현.
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const logoutSV = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
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
  loginSV,
  logIn,
  getUser,
  logOut,
  checkFirstLogin,
  signupSV,
};

export { actionCreators };
