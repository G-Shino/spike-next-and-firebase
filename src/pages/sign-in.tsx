import React, { useState } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import { TextField, Button } from "@material-ui/core";
import { FontSize } from "../constants/Font";
import firebase from "../lib/firebase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState(
    "このフィールドを入力してください。"
  );
  const [password, setPassword] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(
    "このフィールドを入力してください。"
  );

  const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValidationMessage(e.target.validationMessage.slice(0, 22));
  };
  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordValidationMessage(e.target.validationMessage);
    if (e.target.value.length < 6 && e.target.validationMessage == "") {
      setPasswordValidationMessage("パスワードは6文字以上です。");
    }
  };
  const handleSubmitButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("Sing in: OK", user);
      Router.push("/logout");
    } catch (error) {
      console.error("Sign in: ERROR", error);
    }
  };

  return (
    <WrapperDiv>
      <TitleH1>Sign In</TitleH1>
      <MainForm>
        <StyledTextField
          required
          label="Email"
          value={email}
          type="email"
          onChange={handleEmailFormChange}
          helperText={emailValidationMessage}
        />
        <StyledTextField
          required
          label="Password"
          value={password}
          type="password"
          onChange={handlePasswordFormChange}
          helperText={passwordValidationMessage}
        />
        <StyledButton
          variant="outlined"
          type="button"
          onClick={handleSubmitButtonClick}
          disabled={
            !("" === emailValidationMessage && "" === passwordValidationMessage)
          }
        >
          Sign Up
        </StyledButton>
      </MainForm>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleH1 = styled.h1``;

const MainForm = styled.form`
  width: 100%;
  height: 240px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  min-width: 480px;

  .MuiInputLabel-root {
    font-size: ${FontSize.BASE};
  }
  .MuiInputBase-input {
    font-size: ${FontSize.BASE};
  }
` as typeof TextField;

const StyledButton = styled(Button)`
  width: 96px;
  height: auto;
`;

export default SignIn;
