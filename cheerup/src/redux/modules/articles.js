import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";
import instance from "../../shared/Request";
import axios from "axios";
import { history } from "../configureStore";

const LOAD_ARTICLE = "articles/LOAD_ARTICLE";
const CREATE_ARTICLE = "articles/CREATE_ARTICLE";
const UPDATE_ARTICLE = "articles/UPDATE_ARTICLE";
const DELETE_ARTICLE = "articles/DELETE_ARTICLE";
const LIKE = "articles/LIKE";

const loadArticle = createAction(LOAD_ARTICLE, (article_list) => ({
  article_list,
}));
const createArticle = createAction(CREATE_ARTICLE, (article_list, pharase) => ({
  article_list,
  pharase,
}));
const updateArticle = createAction(UPDATE_ARTICLE, (id, content) => ({
  id,
  content,
}));
const deleteArticle = createAction(DELETE_ARTICLE, (id) => ({
  id,
}));
const like = createAction(LIKE, (user_name, articleId) => ({
  user_name,
  articleId,
}));

const initialState = {
  article_list: [],
  saying: [],
  likeItChecker: null,
};

const loadArticleSV = (user_name, id) => {
  return function (dispatch, getState, { history }) {
    console.log(user_name);
    instance
      .get(`/article?username=${user_name}`)
      .then((res) => {
        if (id) {
          const article = res.data.filter((l, idx) => {
            return l.id === parseInt(id);
          });
          dispatch(loadArticle(article));
        } else {
          dispatch(loadArticle(res.data));
        }
      })
      .catch((err) => {
        console.log("list load error!", err);
      });
  };
};

const createArticleSV = (new_article) => {
  console.log(new_article.username);
  return function (dispatch, getState, { history }) {
    instance
      .post("/article", {
        username: new_article.username,
        content: new_article.content,
        saying: new_article.pharase,
      })
      .then((res) => {
        console.log(res);
        dispatch(createArticle(new_article));
        history.push("/list");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const updateArticleSV = (id, content) => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`/article/${id}`, { content })
      .then((res) => {
        if (id) {
          const article = res.data.filter((l, idx) => {
            return l.id === parseInt(id);
          });
          dispatch(loadArticle(article));
        } else {
          dispatch(loadArticle(res.data));
        }
      })
      .catch((err) => {
        console.log("list update error!", err);
      });
    dispatch(updateArticle(id, content));
  };
};

const deleteArticleSV = (id) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/article/${id}`)
      .then((res) => {})
      .catch((err) => {
        console.log("list delete error!", err);
      });
    dispatch(deleteArticle(id));
  };
};

const likeSV = (user_name, articleId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/likeIt", {
        username: user_name,
        articleId: articleId,
      })
      .then((res) => {
        dispatch(like(user_name, articleId));
      })
      .catch(function (error) {
        console.log("like error", error);
      });
  };
};

export default handleActions(
  {
    [LOAD_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = action.payload.article_list;
      }),
    [CREATE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list.push(action.payload.article_list);
      }),
    [UPDATE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.article_list.findIndex(
          (l) => l.id === action.payload.id
        );
        draft.article_list[idx] = {
          ...draft.article_list[idx],
          content: action.payload.content,
        };
      }),
    [DELETE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = draft.article_list.filter((l, idx) => {
          return l.id !== action.payload.id;
        });
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.article_list.findIndex(
          (l) => l.id === action.payload.articleId
        );
        if (draft.article_list[idx].likeItChecker) {
          draft.article_list[idx] = {
            ...draft.article_list[idx],
            likesCount: draft.article_list[idx].likesCount - 1,
            likeItChecker: !draft.article_list[idx].likeItChecker,
          };
        } else {
          draft.article_list[idx] = {
            ...draft.article_list[idx],
            likesCount: draft.article_list[idx].likesCount + 1,
            likeItChecker: !draft.article_list[idx].likeItChecker,
          };
        }

        // draft.article_list = draft.article_list.map((l, idx) => {
        //   if (l.id === action.payload.articleId) {
        //     return { ...l, likesCount: l.likesCount + 1 };
        //   } else {
        //     return l;
        //   }
        // });
      }),
  },
  initialState
);
const actionCreators = {
  createArticle,
  createArticleSV,
  loadArticleSV,
  updateArticleSV,
  deleteArticleSV,
  likeSV,
};
export { actionCreators };
