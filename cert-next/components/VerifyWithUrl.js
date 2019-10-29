class VerifyWithUrl extends React.Component {
  state = {
    url: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.verifyWithUrl(this.state.url)
    this.setState({ url: '' })
  }


  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <legend>Verify</legend>
            <fieldset>
              <div className="form-group">
                <label>Verify with URL</label>
                <input className="form-control" placeholder="Make sure the link is in json format"
                  value={this.state.url} name="url" onChange={this.onChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
          </form>
          <p />
        </div>
      </div>
    );
  }
}

export default VerifyWithUrl;