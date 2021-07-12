import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";
import instance from "../../shared/Request";
import axios from "axios";
import { history } from "../configureStore";

const LOAD_COMMENT = "comments/LOAD_COMMENT";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
// const UPDATE_ARTICLE = "articles/UPDATE_ARTICLE";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const loadComment = createAction(LOAD_COMMENT, (comment_list) => ({
  comment_list,
}));
const createComment = createAction(CREATE_COMMENT, (comment) => ({
  comment,
}));
// const updateArticle = createAction(UPDATE_ARTICLE, (id, content) => ({
//   id,
//   content,
// }));
const deleteComment = createAction(DELETE_COMMENT, (id) => ({
  id,
}));

const initialState = {
  comment_list: [],
};

const loadCommentSV = (id) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/comment/${id}`)
      .then((res) => {
        dispatch(loadComment(res.data));
      })
      .catch((err) => {
        console.log("list load error!", err);
      });
  };
};

const createCommentSV = (new_article) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/comment`, {
        username: new_article.username,
        comment: new_article.comment,
        articleId: new_article.articleId,
      })
      .then((res) => {
        dispatch(createComment({ ...new_article, id: res.data.id }));
      })
      .catch(function (error) {
        console.log("comment create error!", error);
      });
  };
};

// const updateArticleSV = (id, content) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .post(`/article/${id}`, content)
//       .then((res) => {
//         if (id) {
//           const article = res.data.filter((l, idx) => {
//             return l.id === parseInt(id);
//           });
//           // dispatch(loadArticle(article));
//         } else {
//           // dispatch(loadArticle(res.data));
//         }
//       })
//       .catch((err) => {
//         console.log("list update error!", err);
//       });
//     dispatch(updateArticle(id, content));
//   };
// };

const deleteCommentSV = (id) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/comment/${id}`)
      .then((res) => {
        dispatch(deleteComment(id));
      })
      .catch((err) => {
        console.log("list delete error!", err);
      });
  };
};

export default handleActions(
  {
    [LOAD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list = action.payload.comment_list;
      }),
    [CREATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list.unshift(action.payload.comment);
      }),
    // [UPDATE_ARTICLE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.article_list = draft.article_list.map((l, idx) => {
    //       if (l.id === action.payload.id) {
    //         return { ...l, content: action.payload.content };
    //       } else {
    //         return l;
    //       }
    //     });
    //     console.log(draft.article_list[0].content);
    //   }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list = draft.comment_list.filter((l, idx) => {
          return l.id !== action.payload.id;
        });
      }),
  },
  initialState
);
const actionCreators = {
  createCommentSV,
  loadCommentSV,
  // updateArticleSV,
  deleteCommentSV,
};
export { actionCreators };
