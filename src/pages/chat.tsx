import React, { useState, useEffect } from "react";
import Router from "next/router";
import firebase from "./../lib/firebase";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { theme } from "./../constants/Theme";

interface messageData {
  UID: string;
  name: string;
  message: string;
  createdAt: any;
}

const Logout: React.FC = () => {
  const [currentUID, setCurrentUID] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messageDataList, setMessageDataList] = useState<messageData[]>([]);

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
        UID: currentUID,
        name: currentUserName,
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
      setMessageDataList((prev) => [...prev, messageData]);
    });
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser?.uid as string;
    const name = currentUser?.displayName as string;
    setCurrentUID(uid);
    setCurrentUserName(name);
    return () => {
      messageRef.off("child_added");
    };
  }, []);

  return (
    <WrapperDiv>
      <MainDiv>
        <TitleDiv>
          <Typography variant="h1">Hello {currentUserName} !!</Typography>
          <StyledButton type="button" onClick={handleLogoutButtonClick}>
            Logout
          </StyledButton>
        </TitleDiv>
        <MainChatDiv elevation={3}>
          {messageDataList.map((message: messageData, idx) => {
            if (message.UID === currentUID) {
              return (
                <MyMessageDiv key={idx}>
                  <Typography variant="body2" css={CssMessage}>
                    {message.name}
                  </Typography>
                  <Typography variant="body1" css={CssMessage}>
                    {message.message}
                  </Typography>
                </MyMessageDiv>
              );
            } else {
              return (
                <MessageDiv key={idx}>
                  <Typography variant="body2" css={CssMessage}>
                    {message.name}
                  </Typography>
                  <Typography variant="body1" css={CssMessage}>
                    {message.message}
                  </Typography>
                </MessageDiv>
              );
            }
          })}
        </MainChatDiv>
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
      </MainDiv>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  width: 640px;
`;

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 96px;
  height: auto;
`;

const MainChatDiv = styled(Paper)`
  width: 100%;
  height: 640px;
  margin-top: 8px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const MessageDiv = styled.div`
  align-self: flex-start;
  width: 320px;
  margin: 8px 0 8px 8px;
  border: solid 1px #f2f2f2;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const MyMessageDiv = styled.div`
  align-self: flex-end;
  width: 320px;
  margin: 8px 8px 8px 0;
  border: solid 1px ${theme.palette.primary.light};
  background-color: ${theme.palette.primary.light};
  border-radius: 5px;
`;

const CssMessage = css`
  margin-left: 2px;
`;

const StyledMessageForm = styled.form`
  margin: 16px 0;
  height: auto;
`;
const StyledTextField = styled(TextField)`
  min-width: 90%;
` as typeof TextField;

const StyledSendButton = styled(Button)`
  width: 10%;
  height: 56px;
`;

export default Logout;
