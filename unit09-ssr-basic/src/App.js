import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Home from './components/Home';
import About from './components/About';

const fetchUsername = () => {
  const usernames = ['zuzu', 'mimi', 'janny'];
  return new Promise((resolve) => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => resolve(username), 100);
  });
};

const App = (props) => {
  const [nav, setNav] = useState(props.page);
  const [username, setUsername] = useState('');
  const onClickNav = (e) => {
    const pg = e.target.dataset.page;
    console.log('click button : ', pg);
    window.history.pushState(pg, '', `/${pg}`);
    setNav(pg);
  };

  useEffect(() => {
    fetchUsername().then((username) => setUsername(username));
  }, []);

  const PageComponent = nav === 'home' ? Home : About;

  return (
    <div>
      <nav>
        <BTN data-page='home' onClick={onClickNav}>
          HOME
        </BTN>
        <BTN data-page='about' onClick={onClickNav}>
          ABOUT
        </BTN>
      </nav>
      <div>
        페이지 컴포넌트 시작
        <PageComponent username={username} />
        페이지 컴포넌트 끝
      </div>
    </div>
  );
};

const BTN = styled.p`
  display: inline-block;
  background-color: greenyellow;
  font-weight: 900;
  padding: 20px;
  margin: 10px;
`;

export default App;
