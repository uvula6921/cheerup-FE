import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";

const LOAD_ARTICLE = "articles/LOAD_ARTICLE";
const CREATE_ARTICLE = "articles/CREATE_ARTICLE";
const UPDATE_ARTICLE = "articles/UPDATE_ARTICLE";

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

const initialState = {
  username: [],
  article_list: [],
  saying: [],
};

const loadArticleSV = () => {
  return function (dispatch, getState, { history }) {
    const resp = RESP.ARTICLE.articles;
    dispatch(loadArticle(resp));
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
    console.log(getState().article.article_list);
    dispatch(updateArticle(id, content));
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
        console.log("리듀서 안에서의 데이터", action.payload.article_list);
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
  },
  initialState
);
const actionCreators = {
  createArticle,
  loadArticleSV,
  updateArticleSV,
};
export { actionCreators };
