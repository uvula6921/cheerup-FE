import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Box } from "@material-ui/core";
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
  const Login = () => {
    setUsername(inputID.current.value);
    setPassword(inputPW.current.value);
    dispatch(userActions.loginSV(user_name, password));
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Box component="h1" color="#616161">
          로그인
        </Box>
        <TextField
          autoComplete={"off"}
          id="standard-basic"
          label="ID"
          style={{ margin: "30px 0px" }}
          // onChange={(e) => {
          //   SetInput(e.target.value);
          // }}
        ></TextField>
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
        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          variant="contained"
          color="primary"
          // onClick={() => {
          //   Login(id, password);
          // }}
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
