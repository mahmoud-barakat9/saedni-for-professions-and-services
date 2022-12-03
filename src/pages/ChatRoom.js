import React, { useState } from "react";
// Chat component
import Chat, { Message } from "react-simple-chat";
// Chat styles
import "react-simple-chat/src/components/index.css";
const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello my friend!",
      createdAt: "2021-07-21 12:09:12", // optional
      user: {
        id: 2,
        avatar: "https://link-to-avatar/avatar.jpg", // optional
      },
    },
  ]);
  return (
    <div>
      <Chat
        title="Jane Doe"
        user={{ id: 1 }}
        messages={messages}
        onSend={(message) => setMessages([...messages, message])}
        headerAvatar="https://icon-library.com/images/person-png-icon/person-png-icon-29.jpg"
      />
    </div>
  );
};
export default ChatRoom;
