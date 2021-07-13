import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import instance from "../../shared/Request";
import axios from "axios";

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
  // username=testID&password=testPassword
  console.log(user_name, pw);
  return (dispatch, getState, { history }) => {
    axios.post(
      "http://118.67.134.8/user/login",
      `username=${user_name}&password=${pw}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    // .then((res) => {
    //   dispatch(setUser(user_name));
    //   history.replace("/phrase");
    // })
    // .catch((err) => {
    //   console.log("login error!", err);
    //   alert("로그인 정보를 다시 확인해주세요!");
    // });
  };
};

const loginCheckCK = () => {
  return (dispatch, getState, { history }) => {
    if (getCookie("user_name")) {
      dispatch(setUser(getCookie("user_name")));
    }
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
};

export { actionCreators };
