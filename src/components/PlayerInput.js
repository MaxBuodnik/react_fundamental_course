import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class PlayerInput extends Component {
  state = {
    username: ''
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
    console.log(this.state.username)
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}/>
        <button className="button" type="submit" disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.PropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username'
}