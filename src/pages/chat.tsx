import React, { useState, useEffect } from "react";
import Router from "next/router";
import firebase from "./../lib/firebase";
import styled from "@emotion/styled";
import { TextField, Button } from "@material-ui/core";

const Logout: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<string[]>([]);

  const handleLogoutButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(e);
    try {
      firebase.auth().signOut();
      Router.push("/");
    } catch (error) {
      console.error("Logout: ERROR", error);
    }
  };

  const handleMessageTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(e);
    try {
      firebase.database().ref("message").push({
        message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
      console.log("message send: OK");
    } catch (error) {
      console.error("message send: ERROR", error);
    }
  };

  useEffect(() => {
    const messageRef = firebase
      .database()
      .ref("message")
      .orderByChild("createdAt");
    messageRef.off("child_added");
    messageRef.on("child_added", (messageSnapshot) => {
      const messageId = messageSnapshot.key;
      const messageData = messageSnapshot.val();
      console.log(messageId, messageData);
      setMessageList((prev) => [...prev, messageData.message]);
    });
    return () => {
      messageRef.off("child_added");
    };
  }, []);

  return (
    <WrapperDiv>
      <TitleH1>Send Your Message!!</TitleH1>
      <ButtonDiv>
        <StyledButton type="button" onClick={handleLogoutButtonClick}>
          Logout
        </StyledButton>
      </ButtonDiv>
      <StyledMessageForm>
        <StyledTextField
          label="Message"
          value={message}
          onChange={handleMessageTextChange}
        ></StyledTextField>
        <StyledSendButton
          type="button"
          disabled={message === ""}
          onClick={handleSendButtonClick}
        >
          Send
        </StyledSendButton>
      </StyledMessageForm>
      {messageList.map((message, idx) => (
        <p key={idx}>{message}</p>
      ))}
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const TitleH1 = styled.h1`
  margin-top: 16px;
`;

const StyledMessageForm = styled.form`
  margin: 16px 0;
`;

const StyledTextField = styled(TextField)`
  min-width: 480px;
` as typeof TextField;

const StyledSendButton = styled(Button)`
  width: 24px;
  height: 56px;
`;
const ButtonDiv = styled.div`
  width: 240px;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 96px;
  height: auto;
`;

export default Logout;
