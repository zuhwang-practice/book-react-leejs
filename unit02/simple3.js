
/**
 * ! 바벨 사용해보기
 * > 기능
 * 1. 바벨은 자바스크립트 코드를 변환해주는 컴파일러
 * 2. 최신 자바스크립트 문법을 지원하지 않는 환경에서, 최신문법을 쓸수 있게 해줌
 * 3. 코드에서 주석을 제거
 * 4. 코드 압축
 */

class LikeButton extends React.Component {
  constructor() {
    super(props);
    this.state = {
      liked: false,
    };
  }
  render() {
    const text = this.state.liked ? '좋아요 취소' : '좋아요';
    return (
      React.createElement('button', {
      onClick: () => this.setState({ liked: true }),
      text,
    });
    )
  }
}

class Container extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count : 0
    }
    render(){
      return (
        React.createElement(
          'div',
          null,
          React.createElement(LikeButton),
          React.createElement(
            'div',
            {style:{marginTop:20}},
            React.createElement('span',null,'현재 카운트: '),
            React.createElement('span',null,this.state.count),
            React.createElement(
              'button',
              {onClick: ()=>this.setState({count : this.state.count+1})},
              '증가'
            ),
            React.createElement(
              'button',
              {onClick:()=>this.setState({count:this.state.count -1})},
              '감소',
            ),
          ),
        )
      )
    }
  }
}

const domContainer = document.querySelector('#react-root')
ReactDOM.render(React.createElement(Container), domContainer)
