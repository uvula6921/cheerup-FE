import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as modalActions } from "../redux/modules/updateModal";
import { actionCreators as listActions } from "../redux/modules/articles";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const modalStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "356px",
    padding: "20px",
  },
}));

const Edit = ({ article }) => {
  const contentInput = useRef();
  const classes = modalStyles();
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);

  const handleModalClose = () => {
    dispatch(modalActions.openModal(false));
  };

  const submit = () => {
    dispatch(
      listActions.updateArticleSV(article.id, contentInput.current.value)
    );
    handleModalClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <TextField
              label="고민"
              placeholder="고민을 입력해주세요"
              variant="outlined"
              fullWidth
              inputRef={contentInput}
              autoComplete="off"
              defaultValue={article.content}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={submit}
              fullWidth
              style={{
                marginTop: "30px",
              }}
            >
              Save
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Edit;
