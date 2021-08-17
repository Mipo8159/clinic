import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='keywords' content='accreditation' />
          <meta name='description' content='accreditation' />
          <link rel='icon' type='image/png' href='img/rate/rate-5.svg' />

          {/* Link */}
          <link
            rel='stylesheet'
            href='https://use.fontawesome.com/releases/v5.8.1/css/solid.css'
          />

          {/* Bootstrap */}
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
            crossOrigin='anonymous'
          />

          {/* Font Awesome */}
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
          />

          {/* Google fonts */}
          <link
            href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
            rel='stylesheet'
          />

          {/* Js */}
          <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* FACEBOOK COMMENT */}
          <script
            async
            defer
            crossOrigin='anonymous'
            src='https://connect.facebook.net/ka_GE/sdk.js#xfbml=1&version=v11.0&appId=270139260743087&autoLogAppEvents=1'
            nonce='2WoHpcxi'
          ></script>

          <script
            src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
            integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
            crossOrigin='anonymous'
          ></script>
          <script
            src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
            integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'
            crossOrigin='anonymous'
          ></script>

          <script src='/js/nav.js' type='text/javascript'></script>
          <script src='/js/nav-2.js' type='text/javascript'></script>
          {/* editor */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
