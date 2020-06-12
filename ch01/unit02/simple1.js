// React변수는 simple1.html에서 script로딩으로 사용할수 있게 됨!
class LikeButton extends React.Component {
  constructor() {
    super(props);
    // constructor에 state 초기값 지정
    this.state = {
      liked: false,
    };
  }
  render() {
    // 컴포넌트 state에 따라 동적으로 버튼 문구를 적용한다.
    const text = this.state.liked ? '좋아요 취소' : '좋아요';
    // createElement함수는 리액트 요소를 반환한다.
    return React.createElement('button', {
      onClick: () => this.setState({ liked: true }),
      text,
    });
  }
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(LikeButton), domContainer);

//*  React.crateElement(컴포넌트, 프롭스, ...칠드런) => 리액트엘레먼트
//* 1. 컴포넌트
// 첫번째 요소는 문자열(태그명)이나 리액트 컴포넌트가 온다. => button : <button>, p : <p></p>
//* 2. 프롭스
// 컴포넌트가 사용하는 데이터를 나타낸다. 돔요소의 경우 style, className 등의 데이터가 사용될 수 있다.
//* 3. 칠드런
// 컴포넌트가 감싸고 있는 내부 컨텐츠/컴포넌트를 가르킨다. <button>{--여기에 들어가게 된다--}</button>
