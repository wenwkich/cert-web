import Layout from '../components/Layout';
import IssueForm from '../components/IssueForm'
import axios from 'axios';
import Link from 'next/link';

class Issue extends React.Component {

  state = {
    loading: false,
    response: null,
    error: false
  }

  issue = (data) => {
    this.setState({ loading: true })
    axios.post('/api/issue', data)
      .then(res => {
        this.setState({ loading: false, response: res })
      })
      .catch(e => this.setState({ error: true, loading: false }))  
  }

  printResponse = (response) => {
    const id = response.data.id.substring(9);
    const transaction_hash = response.data.signature.anchors[0].sourceId;
    return (
      <div>
        <p>Successfully issued the certificate!
           You can view your certificate <Link href={`/cert/[id]`}
            as={`/cert/${id}`}>
            <a>here</a></Link> and you can view your transaction <Link
            href={`https://testnet.blockexplorer.com/tx/${transaction_hash}`}>
            <a>here</a></Link></p>
      </div>
    )
  }

  render() {
    const { loading, response, error } = this.state;
    return (
      <Layout>
        <div className='container margin-top-5'>
          <IssueForm issue={this.issue}/>
          {loading ? <p>Loading, please wait...</p> : <p/>}
          {error ? <p>Sorry, something went wrong</p> : <p/>}
          {response != null ? this.printResponse(response) : <p/>}
        </div>
      </Layout>
    )
  }
}


export default Issue;