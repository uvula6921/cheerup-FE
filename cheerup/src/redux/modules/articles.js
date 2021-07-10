// import { firestore } from "../../firebase";
// import history from "../../history";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { RESP } from "../../MockAPI";

const LOAD_ARTICLE = "dic/LOAD_ARTICLE";
const CREATE_ARTICLE = "dic/CREATE_ARTICLE";

const loadArticle = createAction(LOAD_ARTICLE, (content) => ({
  content,
}));
const createArticle = createAction(CREATE_ARTICLE, (content, pharase) => ({
  content,
  pharase,
}));

const initialState = {
  username: [],
  content: ["코딩을 잘하고 싶어요"],
  saying: [],
};

export default handleActions(
  {
    [LOAD_ARTICLE]: (state, actioin) =>
      produce(state, (draft) => {
        draft.content = actioin.payload.content;
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
};
export { actionCreators };
