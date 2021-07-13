import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { Grid } from "../components/Styles";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import instance from "../shared/Request";

const Login = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const inputID = React.useRef(null);
  const inputPW = React.useRef(null);
  const [user_name, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [is_possible, SetIsPossible] = React.useState(true);

  const Login = () => {
    const ID = inputID.current.value;
    const PWD = inputPW.current.value;

    if (ID == "" || PWD == "") {
      SetIsPossible(false);
      return;
    }
    //로그인 에러 났을 때도 추가하기.
    setUsername(ID);
    setPassword(PWD);
    // dispatch(userActions.loginSV(user_name, password));
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Box component="h1" color="#616161">
          로그인
        </Box>
        {is_possible ? (
          <TextField
            inputRef={inputID}
            autoComplete={"off"}
            id="standard-basic"
            label="ID"
            style={{ margin: "30px 0px" }}
            // onChange={(e) => {
            //   SetInput(e.target.value);
            // }}
          />
        ) : (
          <TextField
            error
            id="standard-error-helper-text"
            label={
              <Typography style={{ fontSize: "12px" }}>
                정확한 정보를 입력해주세요
              </Typography>
            }
            // helperText="Write first"
            style={{ margin: "30px 0px", fontSize: "10px" }}
            onClick={() => {
              SetIsPossible(true);
            }}
          />
        )}
        {is_possible ? (
          <TextField
            inputRef={inputPW}
            id="standard-password-input"
            label="Password"
            type="password"
            // onChange={(e) => {
            //   Setpassword(e.target.value);
            // }}
            autoComplete="current-password"
            style={{ margin: "0px 0px 50px 0px" }}
          />
        ) : (
          <TextField
            error
            id="standard-error-helper-text"
            label={
              <Typography style={{ fontSize: "12px" }}>
                정확한 정보를 입력해주세요
              </Typography>
            }
            // helperText="Write first"
            style={{ margin: "0px 0px 50px 0px" }}
            onClick={() => {
              SetIsPossible(true);
            }}
          />
        )}
        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          variant="contained"
          color={is_possible ? "primary" : "secondary"}
          className={is_possible ? null : "shake"}
          onClick={() => {
            Login();
          }}
        >
          Login
        </Button>
        <Box
          component="span"
          m={3}
          color="#bdbdbd"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
