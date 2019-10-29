import Layout from '../../components/Layout';
import Certificate from '../../components/Certificate';
import axios from 'axios';

const Cert = (props) => (
  <Layout>
    <div className="container margin-top-5">
      <Certificate data={props.data} />
    </div>
  </Layout>
)

Cert.getInitialProps = async ({ res, query }) => {
  let r = await axios.get(`/api/cert/${query.id}.json`);

  if (r.error && res) {
    res.statusCode = 404;
  } 

  let data = r.data

  return {
    data
  };
};

export default Cert;