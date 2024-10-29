import React, { useState } from "react";
import styled from "styled-components";
import Background from "../assets/Hospital.jpg";
import { Col, Input, InputGroup, Button, Panel, toaster, Notification } from "rsuite";
import MemberIcon from "@rsuite/icons/Member";
import VisibleIcon from "@rsuite/icons/Visible";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [showHide, setShowHide] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleShowHide = () => {
    setShowHide(!showHide);
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };
 const history = useNavigate();
  // Register user
  const registerUser = async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/Register", userData);
        toaster.push(
            <Notification type="success" header="Success">
              User registered
            </Notification>,
            { placement: "topCenter", duration: 3000 }
          );
          setIsRegister(false)
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")

    } catch (error) {
        if (error.response && error.response.data) {
            toaster.push(
                <Notification type="error" header="error">
                  {error.response.data}
                </Notification>,
                { placement: "topCenter", duration: 3000 }
              ); 
        } else {
            console.error('Error registering user:', error);
        }
    }
};



  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/Login', credentials);
      toaster.push(
        <Notification type="success" header="success">
          {response.data}
        </Notification>,
        { placement: "topCenter", duration: 3000 }
      ); 
      history("/Dashboard")
    } catch (error) {
      toaster.push(
        <Notification type="error" header="error">
          {error.response.data}
        </Notification>,
        { placement: "topCenter", duration: 3000 }
      ); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
        if (password !== confirmPassword) {
            toaster.push(
                <Notification type="error" header="Error">
                    Passwords do not match!
                </Notification>,
                { placement: "topCenter", duration: 3000 }
            );
            return;
        }

        const userData = {
            name,
            email,
            password,
        };
        registerUser(userData);
    } else {
        const credentials = {
            email,
            password,
        };
        loginUser(credentials);
    }
};


  return (
    <MainContainer>
      <Container>
        <Col xs={32} md={14} className="columns" style={{ width: "90%" }}>
          <Panel className="panel" style={{ borderRadius: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <h2>Welcome To Meridian Health Hub</h2>
              <p>{isRegister ? "Create Your Account" : "Where Healing Touches Hearts"}</p>
            </div>
            <div style={{ margin: "15px 5px 0px 5px" }}>
              <form onSubmit={handleSubmit}>
                {isRegister ? (
                  <>
                    <div className="Input-Group" style={{ margin: "3px", marginTop: "20px" }}>
                      <label htmlFor="name">NAME:</label>
                      <InputGroup>
                        <Input type="text" value={name} onChange={(value) => setName(value)} />
                        <InputGroup.Addon><UserInfoIcon /></InputGroup.Addon>
                      </InputGroup>
                    </div>
                    
                    <div className="Input-Group" style={{ margin: "3px", marginTop: "20px" }}>
                      <label htmlFor="email">EMAIL:</label>
                      <InputGroup>
                        <Input type="email" value={email} onChange={(value) => setEmail(value)} />
                        <InputGroup.Addon><MemberIcon /></InputGroup.Addon>
                      </InputGroup>
                    </div>

                    <div className="Input-Group" style={{ margin: "3px", marginTop: "20px" }}>
                      <label htmlFor="password">PASSWORD:</label>
                      <InputGroup>
                        <Input
                          type={showHide ? "text" : "password"}
                          value={password}
                          onChange={(value) => setPassword(value)}
                        />
                        <InputGroup.Addon onClick={toggleShowHide}>
                          {showHide ? <VisibleIcon /> : <EyeCloseIcon />}
                        </InputGroup.Addon>
                      </InputGroup>
                    </div>

                    <div className="Input-Group" style={{ margin: "3px", marginTop: "20px" }}>
                      <label htmlFor="confirmPassword">CONFIRM PASSWORD:</label>
                      <InputGroup>
                        <Input
                          type={showHide ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(value) => setConfirmPassword(value)}
                        />
                        <InputGroup.Addon onClick={toggleShowHide}>
                          {showHide ? <VisibleIcon /> : <EyeCloseIcon />}
                        </InputGroup.Addon>
                      </InputGroup>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="Input-Group" style={{ margin: "3px", marginTop: "20px" }}>
                      <label htmlFor="username">EMAIL:</label>
                      <InputGroup>
                        <Input type="text" value={email} onChange={(value) => setEmail(value)} />
                        <InputGroup.Addon><UserInfoIcon /></InputGroup.Addon>
                      </InputGroup>
                    </div>

                    <div className="Input-Group" style={{ margin: "3px", marginTop: "20px" }}>
                      <label htmlFor="password">PASSWORD:</label>
                      <InputGroup>
                        <Input
                          type={showHide ? "text" : "password"}
                          value={password}
                          onChange={(value) => setPassword(value)}
                        />
                        <InputGroup.Addon onClick={toggleShowHide}>
                          {showHide ? <VisibleIcon /> : <EyeCloseIcon />}
                        </InputGroup.Addon>
                      </InputGroup>
                    </div>
                  </>
                )}
                <div style={{ textAlign: "center" }}>
                  <Button
                    style={{ width: "45%", margin: "20px 5px 0px 5px" }}
                    type="submit"
                    size="lg"
                    appearance="primary"
                    onClick={handleSubmit}
                  >
                    {isRegister ? "Register" : "Login"}
                  </Button>
                  <p style={{ marginTop: "20px" }} className="sign-with">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleForm}>
                      {isRegister ? "Login" : "Register"}
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </Panel>
        </Col>
      </Container>
      <Container2>
        <img src={Background} alt="Loading" />
      </Container2>
    </MainContainer>
  );
};

export default Signup;

// Styled Components
const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-items: center;
  justify-content: space-around;
`;

const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container2 = styled(Container)`
  justify-content: initial;
  align-items: initial;
  box-shadow: 3px 9px 31px 8px #2f5da6;
`;
