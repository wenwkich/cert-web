import Head from 'next/head';
import Navbar from './Navbar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Certificate On Blockchain</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css" />
    </Head>
    <Navbar />
    {props.children}
    <style jsx global>{`
      .margin-top-5 {
        margin-top: 5%;
      }
    `}</style>
  </div>
)

export default Layout;