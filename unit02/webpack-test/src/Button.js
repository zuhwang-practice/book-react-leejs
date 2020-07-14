import React from 'react';

function Button(props) {
  return React.createElement('button', null, props.label);
}

// Button 함수(컴포넌트)를 내보낸다. default는 기본설정으로 1개만 내보낼 수있다.
export default Button;
