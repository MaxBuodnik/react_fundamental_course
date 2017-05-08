import React, {Component} from 'react';
import PropTypes from 'prop-types';

const styles = {
  textAlign: 'center',
  fontSize: '35px'
}

export default class Loading extends Component {
  state = {
    text: this.props.text
  };

  componentDidMount() {
    let stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({text: this.props.text})
      } else {
        this.setState((prevState) => {
          return {
            text: prevState.text + '.'
          }
        })
      }
    }, this.props.speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
  render() {
    return (
      <p style={styles}>
        {this.state.text}
      </p>
    )
  }
}

Loading.PropTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300
}