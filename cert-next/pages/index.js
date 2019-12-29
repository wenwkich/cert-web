import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => (
  <Layout>
    <div className="jumbotron">
      <div className="container text-center">
        <h1 className="display-3">Certificate On Blockchain</h1>
        <hr />
        <p className="lead">Just need to enter simple infomation,
        a hash of your certificate will be on blockchain,
        which can be verified</p>
        <p className="lead">
          <Link href="/issue"><a className="btn btn-success btn-lg" role="button">Issue</a></Link>
          <span>    </span>
          <Link href="/verify"><a className="btn btn-success btn-lg" role="button">Verify</a></Link>
        </p>
      </div>
    </div>
    <div className="container">
      <p>This is suppose to be illustration on how to use it</p>
    </div>
    <style jsx>{`
      .jumbotron {
        padding-top: 20vh;
        background-image: url('background.png');
        background-size: cover;
        border-radius: 0px !important;
        min-height: 70vh;
      }
    `}
    </style>
  </Layout>
);

// Index.getInitialProps = async function () {
//   const res = await fetch
//     ('https://api.coindesk.com/v1/bpi/currentprice.json');
//   const data = await res.json();

//   return {
//     bpi: data.bpi
//   }
// }

export default Index;
