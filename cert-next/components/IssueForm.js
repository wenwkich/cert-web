class IssueForm extends React.Component {
  state = {
    name: '',
    email: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.issue(this.state)
    this.setState({ name: '', email: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <legend>Issue</legend>
          <fieldset>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" placeholder="Enter name"
                value={this.state.name} name="name" onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input className="form-control" placeholder="Enter email"
                value={this.state.email} name="email" onChange={this.onChange} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default IssueForm;