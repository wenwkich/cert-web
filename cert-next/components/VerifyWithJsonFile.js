class VerifyWithJsonFile extends React.Component {
  state = {
    selectedFile: null
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: event.target.files[0] })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.log(this.state.selectedFile)
    this.props.verifyWithJsonFile(data)
    this.setState({ selectedFile: null })
  }

  render() {

    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <fieldset>
              <div className="form-group">
                <label>Verify with JSON File</label>
              </div>
              <input type="file" className="form-control"
                name="selectedFile" onChange={this.onChange} />
              <p/>
              <button type="submit" className="btn btn-primary">Upload</button>
            </fieldset>
          </form>
          <p />
        </div>
      </div>
    );
  }
}

export default VerifyWithJsonFile;