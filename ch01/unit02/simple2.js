class LikeButton extends React.Component {
  constructor() {
    super(props);
    this.state = {
      liked: false,
    };
  }
  render() {
    const text = this.state.liked ? '좋아요 취소' : '좋아요';
    return React.createElement('button', {
      onClick: () => this.setState({ liked: true }),
      text,
    });
  }
}

//* 컴포넌트를 여러게 넣기위해 아래와 같은 방식을 사용함.

ReactDom.render(
  React.createElement(LikeButton),
  document.querySelector('#react-root1')
);

ReactDom.render(
  React.createElement(LikeButton),
  document.querySelector('#react-root2')
);

ReactDom.render(
  React.createElement(LikeButton),
  document.querySelector('#react-root3')
);
