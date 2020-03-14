import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Input from "../Input/Input";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "./../Messages/Messages";
import TextContainer from "./../TextContainer/TextContainer";
import "./Chat.css";
let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");

  const ENDPOINT = "https://reactjs-chat-application.herokuapp.com/";
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} name={name} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <TextContainer users={users} />
      </div>
    </>
  );
};
export default Chat;
