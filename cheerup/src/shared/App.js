import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import Main from "../pages/Main";
import List from "../pages/List";
import styled from "styled-components";
import Mainphrase from "../pages/Mainphrase";
import Navigation from "../components/Navigation";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import Detail from "../pages/Detail";
import Modal from "../components/Modal";
import { actionCreators as LoginActions } from "../redux/modules/user";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(LoginActions.logIn());
  }, []);

  return (
    <div className="App">
      <Container>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/phrase" exact component={Mainphrase} />
          <Route path="/list" exact component={List} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/detail/:id" exact component={Detail} />
        </ConnectedRouter>
        <Modal />
        <Navigation />
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 400px;
  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default App;
