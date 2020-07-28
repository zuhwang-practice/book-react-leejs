import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocumnent extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((Compo) => (props) =>
      sheet.collectStyles(<Compo {...props}></Compo>),
    );
    const styles = sheet.getStyleElement();
    return { ...page, styles };
  }
}

export default MyDocumnent;
