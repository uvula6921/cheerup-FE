import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";
import axios from "axios";

const LOAD_ARTICLE = "articles/LOAD_ARTICLE";
const ADD_ARTICLE = "articles/ADD_ARTICLE";
const UPDATE_ARTICLE = "articles/UPDATE_ARTICLE";
const DELETE_ARTICLE = "articles/DELETE_ARTICLE";

const loadArticle = createAction(LOAD_ARTICLE, (article_list) => ({
  article_list,
}));
const addArticle = createAction(ADD_ARTICLE, (article_list) => ({
  article_list,
}));
const updateArticle = createAction(UPDATE_ARTICLE, (id, content) => ({
  id,
  content,
}));
const deleteArticle = createAction(DELETE_ARTICLE, (id) => ({
  id,
}));

const initialState = {
  article_list: [
    {
      content: "배고파요",
      createdAt: "12:33",
      phrase: "이 또한 지나가리라",
      username: "임꺽정",
    },
  ],
};

const loadArticleSV = () => {
  return function (dispatch, getState, { history }) {
    const resp = RESP.ARTICLE.articles;
    dispatch(loadArticle(resp));
  };
};

const addArticleSV = (new_article) => {
  console.log(new_article);
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://52.78.217.45/saying",
      data: {
        firstName: "Fred",
        lastName: "Flintstone",
      },
    });
    // const resp = RESP.ARTICLE.articles;
    dispatch(addArticle(new_article));
    // history.push("/list");
    console.log(new_article);
  };
};

const updateArticleSV = (id, content) => {
  return function (dispatch, getState, { history }) {
    const resp = RESP.ARTICLE.articles;
    resp.map((l, idx) => {
      // if (l._id === id) {
      //   console.log(content);
      //   return { ...l, content: content };
      // } else {
      //   return l;
      // }
    });
    dispatch(updateArticle(id, content));
  };
};
const deleteArticleSV = (id) => {
  return function (dispatch, getState, { history }) {
    const resp = RESP.ARTICLE.articles;
    resp.map((l, idx) => {
      // if (l._id === id) {
      //   console.log(content);
      //   return { ...l, content: content };
      // } else {
      //   return l;
      // }
    });
    dispatch(deleteArticle(id));
  };
};

export default handleActions(
  {
    [LOAD_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = action.payload.article_list;
        console.log(draft.article_list);
      }),
    [ADD_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list.push(action.payload.article_list);
      }),
    [UPDATE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = draft.article_list.map((l, idx) => {
          if (l._id === action.payload.id) {
            return { ...l, content: action.payload.content };
          } else {
            return l;
          }
        });
        console.log(draft.article_list[0].content);
      }),
    [DELETE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = draft.article_list.filter((l, idx) => {
          return l._id !== action.payload.id;
        });
      }),
  },
  initialState
);
const actionCreators = {
  loadArticle,
  addArticle,
  addArticleSV,
  loadArticleSV,
  updateArticleSV,
  deleteArticleSV,
};
export { actionCreators };
