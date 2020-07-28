import Layout from '../src/Layout';

const MyApp = ({ Component, pageProps }) => {
  // ? Component 는 현재 활성화 된 page를 가르킨다!
  // ? 만약 라우터를 통해 페이지를 이동하면 Component는 이동한 selected-page를 가르킨다
  // ? 그러므로, Component로 보내는 props는 페이지로 부터 받는다

  // const getInitialProps = async (appContext) => {
  //   // ? pageProps는 해당 Component(화면에 그릴 선택된 Component, page)가 서버로 부터 받은 초기 데이터를 나타낸다
  //   // ? 일반 페이지/컴포넌트에서 사용된 getInitialProps()를 통해 받은 appContext는  _app.js에서 최초 호출된 getInitialProps()의 appContext가 전달된 것이다!
  //   let pageProps = {};
  //   console.log('_app 호출 : 컴포넌트 패칭 시작');
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(appContext);
  //   }
  //   console.log('_app 호출 : 끝');
  //   return { pageProps };
  // };
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
