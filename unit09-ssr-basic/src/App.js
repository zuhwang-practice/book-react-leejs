import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Home from './components/Home';
import About from './components/About';

const App = (props) => {
  const [nav, setNav] = useState(props.page);
  const onClickNav = (e) => {
    const pg = e.target.dataset.page;
    console.log('click button : ', pg);
    window.history.pushState(pg, '', `/${pg}`);
    setNav(pg);
  };

  useEffect(() => {
    console.log('props.page', props.page);
    console.log('마운트완료, 기본세팅');
    // window.onpopstate = (e) => {
    //   console.log(e);
    //   setNav(e.state);
    // };
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
        <PageComponent />
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
