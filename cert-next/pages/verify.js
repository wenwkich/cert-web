import Layout from '../components/Layout';
import VerifyWithUrl from '../components/VerifyWithUrl';
import VerifyWithJsonFile from '../components/VerifyWithJsonFile';
import axios from 'axios';

class Verify extends React.Component {

  state = {
    error: false,
    response: null,
    loading: false
  }

  resetState = () => {
    this.setState({ response: null, error: false })
  }

  verifyWithUrl = async (url) => {
    this.setState({ loading: true })
    let url_response = await axios.get(url)
    let data = url_response.data
    await axios.post("/api/verify", data)
      .then(res => {
        console.log(res)
        this.setState({ response: res, loading: false,  })
      })
      .catch(e => this.setState({ error: true, loading: false,  })) 
  }

  verifyWithJsonFile = async () => {

  }

  printResponse = (response) => {
    let data = response.data
    if (data[data.length - 1].status == "passed") {
      return (
        <p>Successfully verified the result!</p>
      )
    } else {
      return (
        <p>Sorry, we can't verify your certificate</p>
      )
    }
  }
  
  render() {
    const { loading, response, error } = this.state;

    return (
      <Layout>
        <div className='container margin-top-5'>
          <VerifyWithUrl verifyWithUrl={this.verifyWithUrl}/>
          {/* <VerifyWithJsonFile /> */}
          {loading ? <p>Loading, please wait...</p> : <p />}
          {error ? <p>Sorry, we can't verify your certificate</p> : <p />}
          {response != null ? this.printResponse(response) : <p />}
          <button type="button" className="btn btn-secondary" onClick={this.resetState.bind(this)}>
            <span>Reset Message</span>
          </button>
        </div>
      </Layout>
    );
  }
}

export default Verify;