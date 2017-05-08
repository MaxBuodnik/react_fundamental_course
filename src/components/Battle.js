import React, {Component} from 'react';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';
import {Link} from 'react-router-dom';



export default class Battle extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      let newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = "https://github.com/" + username + ".png?size=200";
      return newState;
    });
  }

  handleReset = (id) => {
    this.setState(() => {
      let newState = {};
      newState[id + "Name"] = '';
      newState[id + "Image"] = null;
      return newState;
    })
  }

  render() {
    const jazz = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
          <PlayerInput
            id="playerOne"
            label="Player One"
            onSubmit={this.handleSubmit}
          />}
          {playerOneImage &&
          <PlayerPreview
            username={playerOneName}
            avatar={playerOneImage}>
          <button className="reset" onClick={() => this.handleReset("playerOne")}>Reset</button>
      </PlayerPreview>}

          {!playerTwoName &&
          <PlayerInput
            id="playerTwo"
            label="Player Two"
            onSubmit={this.handleSubmit}
          />}
          {playerTwoImage &&
          <PlayerPreview
            username={playerTwoName}
            avatar={playerTwoImage}>
            <button className="reset" onClick={() => this.handleReset("playerTwo")}>Reset</button>
          </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
        <Link className="button"
              to={{
                pathname: jazz.url + '/results',
                search: "?playerOneName=" + playerOneName + "&playerTwoName=" + playerTwoName
              }}>
          Compare them!
        </Link>}
      </div>
    )
  }
}