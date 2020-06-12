import React from 'react';
import styled from 'styled-components';

const BoxCommon = styled.div`
  height: 50px;
  background-color: #aaa;
`;

const BoxBig = BoxCommon.extend`
  width: 200px;
`;

const BoxSmall = BoxCommon.extend`
  width: 100px;
`;

function Box({ size }) {
  if (size === 'big') {
    return <BoxBig>큰박스</BoxBig>;
  } else {
    return <BoxSmall>작은박스</BoxSmall>;
  }
}

export default Box;
