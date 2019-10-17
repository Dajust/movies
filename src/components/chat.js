// node_modules
import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/database';

const fbConfig = {
  apiKey: 'AIzaSyBUD8vlXCcdS7M2qNLdi8N6vL2RtnZ7Vus',
  authDomain: 'turtle-movies-fa116.firebaseapp.com',
  databaseURL: 'https://turtle-movies-fa116.firebaseio.com',
  projectId: 'turtle-movies-fa116',
  storageBucket: 'turtle-movies-fa116.appspot.com',
  messagingSenderId: '694095147894',
  appId: '1:694095147894:web:48889d02f3f743f0528057'
};

firebase.initializeApp(fbConfig);

const Chat = ({ goBack, selectedMovie }) => {
  const [messageText, setMessageText] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const path = useRef('chats/' + selectedMovie.id);

  useEffect(() => {
    const chatRef = firebase.database().ref(path.current);
    chatRef.on('value', function(snapshot) {
      snapshot.val() && setMessageList([...snapshot.val()]);
      setIsLoading(false);
    });
  }, []);

  function sendChat(e) {
    e.preventDefault();

    firebase
      .database()
      .ref(path.current)
      .once('value')
      .then(function(snapshot) {
        let prevChats = snapshot.val();

        if (prevChats) {
          firebase
            .database()
            .ref()
            .update({ [path.current]: [...prevChats, messageText] });
        } else {
          // start a new chat for this movie
          firebase
            .database()
            .ref()
            .update({ [path.current]: [messageText] });
        }
      });

    setMessageList([...messageList, messageText]);
    setMessageText('');
  }

  return (
    <section
      css={`
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        z-index: 2;
        padding: 0;
        border-radius: 3px;
        background-color: #242e39;
        animation: slideInChat 0.3s;
        @keyframes slideInChat {
          from {
            transform: translateX(120%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}
    >
      <header
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <span
          onClick={goBack}
          css={`
            height: 40px;
            width: 40px;
            text-align: center;
            line-height: 28px;
            font-size: 35px;
            font-weight: bold;
            margin: 5px;
            margin-right: 15px;
            cursor: pointer;
            transition: background-color 0.25s ease-in-out;
            border-radius: 50%;
            &:hover {
              background-color: rgba(0, 0, 0, 0.15);
            }
            &:active {
              background-color: rgba(0, 0, 0, 0.25);
            }
          `}
        >
          &#8592;
        </span>
        <span
          css={`
            font-size: 18px;
            font-weight: bold;
          `}
        >
          {selectedMovie.title}
        </span>
      </header>
      <section>
        {isLoading && (
          <div
            css={`
              font-size: 14px;
              font-style: italic;
              text-align: center;
              padding: 15px;
            `}
          >
            Loading...
          </div>
        )}
        <ul
          css={`
            padding: 15px;
          `}
        >
          {messageList.map((message, i) => (
            <li
              key={i}
              css={`
                display: inline-block;
                float: left;
                clear: both;
                background-color: #3d4854;
                padding: 7px 10px;
                border-radius: 5px;
                margin-bottom: 10px;
              `}
            >
              {message}
            </li>
          ))}
        </ul>
      </section>

      <footer
        css={`
          padding: 15px;
          position: sticky;
          top: 100%;
          background-color: #2c3845;
        `}
      >
        <form
          onSubmit={sendChat}
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <input
            type="text"
            placeholder="say something..."
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            css={`
              flex: 100%;
              margin-right: 15px;
              background-color: #242e39;
              border: 1px solid transparent;
              padding: 5px 15px;
              font-size: 16px;
              border-radius: 25px;
              outline: none;
              &:focus {
                border-color: #445263;
              }
            `}
          />
          <button
            css={`
              background-color: #4b908f;
              border: 1px solid #4b908f;
              outline: none;
              border-radius: 25px;
              padding: 5px 15px;
              font-size: 16px;
              letter-spacing: 1px;
              opacity: ${messageText ? 1 : 0.5};
              pointer-events: ${messageText ? 'auto' : 'none'};
              &:hover {
                background-color: #5bb9b8;
              }
              &:focus,
              &:active {
                border: 1px solid #5bb9b8;
              }
              transition: all 0.25s ease-in-out;
            `}
          >
            Send
          </button>
        </form>
      </footer>
    </section>
  );
};

Chat.propTypes = {
  goBack: PropTypes.func.isRequired,
  selectedMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Chat;
