import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import instance from "../../shared/Request";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const CHECK_FIRSTLOGIN = "CHECK_FIRSTLOGIN";

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user_name) => ({ user_name }));
const checkFirstLogin = createAction(CHECK_FIRSTLOGIN, (user) => ({ user }));

const initialState = {
  user_name: "",
  is_login: false,
  is_firstlogin: false,
};

const loginSV = (user_name, pw) => {
  return function (dispatch, getState, { history }) {
    console.log(user_name, pw);
    instance
      .post("/user/login", {
        username: user_name,
        password: pw,
      })
      .then((res) => {
        cookies.set("refresh_token", res.data, { sameSite: "strict" });
        getState().user.is_login = true;
        history.replace("/phrase");
      })
      .catch((err) => {
        console.log("login error!", err);
      });
  };
};

const loginCheckCK = () => {
  return (dispatch, getState, { history }) => {
    const token = cookies.get("refresh_token");
    const decoded = jwt_decode(token);
    dispatch(setUser(decoded.sub));
  };
};

const signupSV = (id, pwd, pwdChecker) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/signup", {
        username: id,
        password: pwd,
        passwordChecker: pwdChecker,
      })
      .then((res) => {
        console.log(res);
        history.replace("/login");
      })
      .catch((err) => {
        console.log("signup error!", err);
      });
  };
};

const logoutSV = () => {
  return (dispatch, getState, { history }) => {
    instance
      .get("/user/logout")
      .then((res) => {
        dispatch(logOut());
        history.replace("/list");
      })
      .catch((err) => {
        console.log("logout error!", err);
      });
  };
};

export default handleActions(
  {
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        window.localStorage.setItem("logout", Date.now());
        cookies.remove("refresh_token");
        deleteCookie("is_login");
        deleteCookie("user_name");
        draft.user = null;
        draft.is_login = false;
        draft.is_firstlogin = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        setCookie("user_name", action.payload.user_name);
        draft.user_name = action.payload.user_name;
        draft.is_login = true;
        draft.is_firstlogin = true;
      }),
    [CHECK_FIRSTLOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_firstlogin = false;
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  checkFirstLogin,
  loginSV,
  loginCheckCK,
  logoutSV,
  signupSV,
  setUser,
};

export { actionCreators };
