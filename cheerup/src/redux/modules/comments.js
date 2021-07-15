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

const loadComment = createAction(
  LOAD_COMMENT,
  (comment_list, comment_count) => ({
    comment_list,
    comment_count,
  })
);
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
  comment_count: "",
};

const loadCommentSV = (id, comment_count) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/comment/${id}`)
      .then((res) => {
        dispatch(loadComment(res.data, comment_count));
        console.log(comment_count);
      })
      .catch((err) => {
        console.log("list load error!", err);
      });
  };
};

const createCommentSV = (new_comment) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/comment`, {
        username: new_comment.username,
        comment: new_comment.comment,
        articleId: new_comment.articleId,
      })
      .then((res) => {
        dispatch(createComment({ ...new_comment, id: res.data.id }));
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
        draft.comment_count = action.payload.comment_count;
      }),
    [CREATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list.unshift(action.payload.comment);
        draft.comment_count += 1;
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
        draft.comment_count -= 1;
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
