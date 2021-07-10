import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";

const LOAD_ARTICLE = "articles/LOAD_ARTICLE";
const CREATE_ARTICLE = "articles/CREATE_ARTICLE";

const loadArticle = createAction(LOAD_ARTICLE, (article_list) => ({
  article_list,
}));
const createArticle = createAction(CREATE_ARTICLE, (content, pharase) => ({
  content,
  pharase,
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

export default handleActions(
  {
    [LOAD_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = action.payload.article_list;
        draft.content = action.payload.content;
        // console.log(RESP);
      }),
    [CREATE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 안에서의 데이터", action.payload.content);
        draft.content.push(action.payload.content);
      }),
  },
  initialState
);
const actionCreators = {
  loadArticle,
  createArticle,
  loadArticleSV,
};
export { actionCreators };
