import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { history } from "../redux/configureStore";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: "0px 0px 40px 0px" }}>
      <button
        type="button"
        onClick={handleOpen}
        className="openModal"
        style={{
          border: "none",
          background: "transparent",
          textDecoration: "underline",
          color: "#a1a9d6",
          cursor: "pointer",
        }}
      >
        항해팍도사 사용법
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={classes.paper}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3 id="transition-modal-title">사용설명서</h3>
            <p id="transition-modal-description">
              1. 복잡한 고민이나 질문을 생각합니다. <br />
              2. 잠시 눈을 감고 5초간 집중하며 생각합니다. <br />
              3. 고민을 입력합니다 <br />
            </p>
            <Button
              color="primary"
              onClick={() => {
                history.push("/list");
                handleClose();
              }}
            >
              다른 사람들 질문 보러가기
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
