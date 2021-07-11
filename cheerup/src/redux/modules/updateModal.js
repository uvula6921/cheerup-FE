import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";

const OPEN_MODAL = "updateModal/OPEN_MODAL";

const openModal = createAction(OPEN_MODAL, (modal) => ({
  modal,
}));

const initialState = {
  modal: false,
};

export default handleActions(
  {
    [OPEN_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modal = action.payload.modal;
      }),
  },
  initialState
);
const actionCreators = {
  openModal,
};
export { actionCreators };
